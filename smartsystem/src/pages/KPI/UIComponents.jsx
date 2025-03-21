import React from "react";

// SVG Icon Components - Consolidated
export const Icon = ({ type, ...props }) => {
    const paths = {
        search: [
          <path key="p1" d="M11.5 21C16.7467 21 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>,
          <path key="p2" d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        ],
        chevronDown: [
          <path key="p1" d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={props.strokeWidth || 1.5}/>
        ],
        home: [
          <path key="p1" d="M12 18V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>,
          <path key="p2" d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        ],
        view: [
          <path key="p1" d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>,
          <path key="p2" d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47003 3.71997 5.18003 5.79997 2.89003 9.39997C1.99003 10.81 1.99003 13.18 2.89003 14.59C5.18003 18.19 8.47003 20.27 12 20.27Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        ],
        edit: [
          <path key="p1" d="M11.4922 2.789H7.75324C4.67824 2.789 2.75024 4.966 2.75024 8.048V16.362C2.75024 19.444 4.66924 21.621 7.75324 21.621H16.5772C19.6622 21.621 21.5812 19.444 21.5812 16.362V12.334" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>,
          <path key="p2" d="M8.82861 10.921L16.3066 3.44297C17.2286 2.52097 18.7056 2.52097 19.6286 3.44297L20.8566 4.67097C21.7786 5.59297 21.7786 7.06997 20.8566 7.99197L13.3786 15.469C12.9966 15.851 12.4886 16.056 11.9576 16.056H8.09761L8.19261 12.235C8.20461 11.725 8.42761 11.249 8.82861 10.921Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>,
          <path key="p3" d="M15.1641 4.60254L19.7481 9.18654" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        ],
        delete: [
          <path key="p1" d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
          <path key="p2" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
          <path key="p3" d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
          <path key="p4" d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
          <path key="p5" d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        ]
      };
    
      const viewBox = props.width ? `0 0 ${props.width} ${props.height || props.width}` : "0 0 24 24";
      const size = props.size || "1em";
      
      return (
        <svg
          aria-hidden="true"
          fill="none"
          focusable="false"
          height={props.height || size}
          width={props.width || size}
          role="presentation"
          viewBox={viewBox}
          {...props}
        >
          {paths[type]}
        </svg>
      );
    };