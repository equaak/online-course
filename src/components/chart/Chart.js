import React, { useState } from 'react';

import './Chart.css';

const Chart = ({ data, w, h }) => {
  const [tooltip, setTooltip] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const width = w;
  const height = h;
  const padding = 50;

  const maxY = Math.max(...data);
  const scaleX = (index) => (index / (data.length - 1)) * (width - padding * 2) + padding;
  const scaleY = (value) => height - padding - (value / maxY) * (height - padding * 2);

  const formatNumber = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
  };

  const generateSmoothPath = () => {
    const pathData = data.reduce((acc, value, index, array) => {
      const x = scaleX(index);
      const y = scaleY(value);
      if (index === 0) return `M ${x} ${y}`;
      
      const prevX = scaleX(index - 1);
      const prevY = scaleY(array[index - 1]);
      const cp1X = (prevX + x) / 2;
      const cp1Y = prevY;
      const cp2X = (prevX + x) / 2;
      const cp2Y = y;

      return `${acc} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y}`;
    }, '');

    return pathData;
  };

  const showTooltip = (event, value, index) => {
    setTooltip({
      x: scaleX(index),
      y: scaleY(value),
      value,
      label: `Aug ${index + 1}`,
    });
    setHoveredIndex(index);
  };

  const hideTooltip = () => {
    setTooltip(null);
    setHoveredIndex(null);
  };

  return (
    <div className="chart-container background-color-gray-white" style={{width: w}}>
      <svg width={width} height={height} className="chart-svg">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c6ef5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4c6ef5" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={generateSmoothPath()}
          fill="none"
          stroke="#4c6ef5"
          strokeWidth="2"
        />
        
        <path
          d={`${generateSmoothPath()} L ${scaleX(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`}
          fill="url(#gradient)"
        />

        {data.map((value, index) => (
          hoveredIndex === index && (
            <circle
              key={index}
              cx={scaleX(index)}
              cy={scaleY(value)}
              r={5}
              fill="#4c6ef5"
            />
          )
        ))}

        {data.map((value, index) => (
          <rect
            key={index}
            x={scaleX(index) - 5}
            y={scaleY(value) - 5}
            width={10}
            height={10}
            fill="transparent"
            onMouseEnter={(e) => showTooltip(e, value, index)}
            onMouseLeave={hideTooltip}
          />
        ))}

        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = maxY * ratio;
          return (
            <text
              key={index}
              x={padding - 10}
              y={scaleY(value)}
              className="chart-y-axis-label body-s400 color-gray-400"
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {formatNumber(value)}
            </text>
          );
        })}

        {[0, Math.floor(data.length / 4), Math.floor(data.length / 2), Math.floor((3 * data.length) / 4), data.length - 1].map((index, labelIndex) => (
          <text
            key={labelIndex}
            x={scaleX(index)}
            y={height - padding + 20}
            className="chart-x-axis-label body-s400 color-gray-400"
            textAnchor="middle"
          >
            {`Aug ${index + 1}`}
          </text>
        ))}
      </svg>

      {tooltip && (
        <div
          className="chart-tooltip background-color-gray-900"
          style={{
            top: tooltip.y - 55,
            left: tooltip.x - 50,
          }}
        >
          <p className="chart-tooltip-value body-m500 color-gray-white">{tooltip.value.toLocaleString()}</p>
          <p className='body-s500 color-gray-500'>{tooltip.label}</p>
        </div>
      )}
    </div>
  );
};

export default Chart;
