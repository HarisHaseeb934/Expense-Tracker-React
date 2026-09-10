const DashboardSvg = () => {
  return (
    <svg
      class="w-full h-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 320 60"
    >
      <defs>
        <linearGradient id="balanceGlow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#4edea3" stop-opacity="0.32"></stop>
          <stop offset="100%" stop-color="#4edea3" stop-opacity="0.0"></stop>
        </linearGradient>
      </defs>
      <path
        d="M0 48 Q 40 46, 75 32 T 150 26 T 220 18 T 280 22 T 320 8 L 320 60 L 0 60 Z"
        fill="url(#balanceGlow)"
      ></path>
      <path
        d="M0 48 Q 40 46, 75 32 T 150 26 T 220 18 T 280 22 T 320 8"
        stroke="#4edea3"
        stroke-linecap="round"
        stroke-width="2.5"
      ></path>
    </svg>
  );
};

export default DashboardSvg;
