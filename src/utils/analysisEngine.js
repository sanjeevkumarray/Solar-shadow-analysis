export function runAnalysis({ buildings, tanks, tables, azimuth, elevation }) {
  const results = { tables: {} };

  const azRad = ((azimuth - 180) * Math.PI) / 180;
  const elRad = (elevation * Math.PI) / 180;

  const sunDir = {
    x: -Math.sin(azRad) * Math.cos(elRad),
    z: -Math.cos(azRad) * Math.cos(elRad),
    y: Math.sin(elRad),
  };

  tables.forEach((table) => {
    const panelsData = [];
    let cumulativeTableEfficiency = 0;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const panelId = `R${row}C${col}`;

        const pOffsetX = (col - 1) * 1.1;
        const pOffsetY = (row - 0.5) * 1.7;

        const panelWorldPos = {
          x: table.x + pOffsetX,
          z: table.y + pOffsetY,
          y: Math.max(
            0.5,
            1 + pOffsetY * Math.sin((table.tilt * Math.PI) / 180),
          ),
        };

        let shadeCoverageRatio = 0;

        if (sunDir.y > 0.05) {
          [...buildings, ...tanks].forEach((obj) => {
            const dx = obj.x - panelWorldPos.x;
            const dz = obj.y - panelWorldPos.z;
            const horizontalDist = Math.sqrt(dx * dx + dz * dz);

            const rayProjectionFactor =
              horizontalDist /
              Math.sqrt(sunDir.x * sunDir.x + sunDir.z * sunDir.z);
            const shadowCastingHeight =
              panelWorldPos.y + rayProjectionFactor * sunDir.y;

            if (shadowCastingHeight <= obj.height) {
              if (obj.width) {
                if (
                  Math.abs(dx) < obj.width * 1.5 &&
                  Math.abs(dz) < obj.length * 1.5
                ) {
                  shadeCoverageRatio = Math.min(1, shadeCoverageRatio + 0.65);
                }
              } else if (obj.radius) {
                if (horizontalDist < obj.radius * 2) {
                  shadeCoverageRatio = Math.min(1, shadeCoverageRatio + 0.8);
                }
              }
            }
          });
        } else {
          shadeCoverageRatio = 1.0;
        }

        let edgeOcclusionFactor = 0;
        if (shadeCoverageRatio > 0 && shadeCoverageRatio < 1) {
          edgeOcclusionFactor = Math.min(
            0.95,
            parseFloat((shadeCoverageRatio * 1.28).toFixed(2)),
          );
        } else if (shadeCoverageRatio === 1) {
          edgeOcclusionFactor = 1.0;
        }

        const linearLoss = shadeCoverageRatio * 1.0;
        const eofPenalizationMultiplier = edgeOcclusionFactor * 0.45;

        let performanceEfficiency =
          1 - (linearLoss + eofPenalizationMultiplier);
        performanceEfficiency = Math.max(0, Math.min(1, performanceEfficiency));

        cumulativeTableEfficiency += performanceEfficiency;

        panelsData.push({
          id: panelId,
          shadeRatio: Math.round(shadeCoverageRatio * 100),
          eof: Math.round(edgeOcclusionFactor * 100) / 100,
          efficiency: Math.round(performanceEfficiency * 100),
        });
      }
    }

    const tableAvgEff = Math.round((cumulativeTableEfficiency / 6) * 100);
    results.tables[table.id] = {
      avgEfficiency: tableAvgEff,
      panels: panelsData,
    };
  });

  return results;
}
