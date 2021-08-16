// import React, { useState } from 'react';
// import { Layer } from 'recharts';

// const Demo = (props, {
//   sourceX,
//   targetX,
//   sourceY,
//   targetY,
//   sourceControlX,
//   targetControlX,
//   linkWidth,
//   index,
// }) => {
//   const [color, setColor] = useState('red');
//   return (
//     <Layer key={`CustomLink${index}`}>
//       <path
//         d={`
//             M${sourceX},${sourceY + linkWidth / 2}
//             C${sourceControlX},${sourceY + linkWidth / 2}
//               ${targetControlX},${targetY + linkWidth / 2}
//               ${targetX},${targetY + linkWidth / 2}
//             L${targetX},${targetY - linkWidth / 2}
//             C${targetControlX},${targetY - linkWidth / 2}
//               ${sourceControlX},${sourceY - linkWidth / 2}
//               ${sourceX},${sourceY - linkWidth / 2}
//             Z
//           `}
//         fill={color}
//         strokeWidth="10"
//         onMouseEnter={() => { setColor({ fill: 'red' }); }}
//         onMouseLeave={() => { setColor({ fill: 'blue' }); }}
//       />
//     </Layer>
//   );
// };

// export default Demo;
