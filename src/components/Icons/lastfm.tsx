import React from 'react';
import IconTypes from './iconTypes';

const LastFm: React.FunctionComponent<IconTypes> = ({ width = 40, height = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.195 112.195" width={width} height={height} role={'img'}>
    <path
      fill="#d31f27"
      d="M112.195 56.097c0 30.983-25.114 56.099-56.097 56.099C25.115 112.195 0 87.08 0 56.097 0 25.117 25.115 0 56.099 0c30.982 0 56.096 25.117 56.096 56.097z"
    />
    <path
      fill="#fff"
      d="M80.487 52.141c-6.203-1.849-8.412-2.874-8.412-4.922 0-3.416 4.937-4.702 5.497-4.79 3.139-.465 7.072 1.173 8.34 4.99l8.44-2.553c-2.65-8.385-10.487-12.099-18.099-10.975-7.788 1.146-12.782 6.786-12.782 13.327 0 8.8 8.244 11.332 14.43 13.181 6.509 1.944 8.401 2.637 8.401 5.023 0 2.016-1.196 3.895-4.374 4.735-6.32 1.664-14.586-.672-16.887-4.523-1.351-2.261-2.733-5.203-4.001-8.53-3.766-9.866-8.926-23.371-23.764-23.371-7.731 0-21.851 3.743-21.851 24.868 0 8.744 7.481 19.613 21.578 19.613 11.829 0 13.888-4.32 14.358-5.085L47.5 65.574c-.098.138-3.692 4.936-10.497 4.936-11.107 0-12.735-11.776-12.735-11.909 0-10.967 4.687-16.238 13.008-16.238 8.094 0 11.382 7.04 15.48 17.759 1.397 3.683 2.922 6.966 4.65 9.865 3.657 6.116 11.55 8.091 19.473 8.091 2.418 0 5.2.137 7.351-.432 7.093-1.878 10.905-6.178 10.905-12.224.002-9.204-8.283-11.378-14.648-13.281z"
    />
  </svg>
);

export default LastFm;