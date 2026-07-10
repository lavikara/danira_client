import React from 'react';

interface LoadingSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

export const LoadingSvg: React.FC<LoadingSvgProps> = ({
  width = 20,
  height = 20,
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={width}
    height={height}
    className={className}
  >
    <g fill="currentColor" stroke="currentColor" strokeWidth="15">
      <rect width="30" height="30" x="125" y="45">
        <animateTransform
          attributeName="transform"
          type="translate"
          calcMode="spline"
          dur="2"
          values="0 0;0 80;0 80;0 80;-80 80;"
          keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
        />
      </rect>
      <rect width="30" height="30" x="45" y="45">
        <animateTransform
          attributeName="transform"
          type="translate"
          calcMode="spline"
          dur="2"
          values="0 0;0 0;80 0;80 0;80 0;"
          keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
        />
      </rect>
      <rect width="30" height="30" x="45" y="125">
        <animateTransform
          attributeName="transform"
          type="translate"
          calcMode="spline"
          dur="2"
          values="0 0;0 0 ;0 0;0 -80;0 -80;"
          keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
        />
      </rect>
    </g>
  </svg>
);
