// import React, { useState } from 'react';
// import { Stage, Layer, Rect, Circle, Text } from 'react-konva';

// function Canvas() {

//    const [shapes, setShapes] = useState([]);

//    const addRectangle = () => {
//       const newRect = {
//          id: `rect-${shapes.length}`,
//          type: 'rect',
//          x: 100,
//          y: 100,
//          width: 50,
//          height: 50,
//          fill: 'red',
//          draggable: true
//       };
//       setShapes([...shapes, newRect]);
//    };

//    const addCircle = () => {
//       const newCircle = {
//          id: `circle-${shapes.length}`,
//          type: 'circle',
//          x: 100,
//          y: 100,
//          radius: 25,
//          fill: 'blue',
//          draggable: true
//       };
//       setShapes([...shapes, newCircle]);
//    };

//    return (
//       <>
//          <div style={{ marginBottom: '10px' }}>
//             <button onClick={addRectangle}>Add Rectangle</button>
//             <button onClick={addCircle}>Add Circle</button>
//          </div>
//          <Stage width={500} height={500} style={{ border: '1px solid black' }}>
//             <Layer>
//                {shapes.map((shape) => {
//                   if (shape.type === 'rect') {
//                      return (
//                         <Rect
//                            key={shape.id}
//                            x={shape.x}
//                            y={shape.y}
//                            width={shape.width}
//                            height={shape.height}
//                            fill={shape.fill}
//                            draggable={shape.draggable}
//                         />
//                      );
//                   } else if (shape.type === 'circle') {
//                      return (
//                         <Circle
//                            key={shape.id}
//                            x={shape.x}
//                            y={shape.y}
//                            radius={shape.radius}
//                            fill={shape.fill}
//                            draggable={shape.draggable}
//                         />
//                      );
//                   }
//                   return null;
//                })}
//             </Layer>
//          </Stage>
//       </>
//    );
// }

// export default Canvas

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import Konva from 'konva';

function Canvas() {
   const [shapes, setShapes] = useState([]); 
   const [selectedId, setSelectedId] = useState(null); 
   const trRef = useRef();
   const shapeRefs = useRef({});

   useEffect(() => {
      if (selectedId && trRef.current && shapeRefs.current[selectedId]) {
        trRef.current.nodes([shapeRefs.current[selectedId].current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [selectedId]);

   const addRectangle = () => {
      const newRect = {
         id: `rect-${shapes.length}`,
         type: 'rect',
         x: 100,
         y: 100,
         width: 100,
         height: 60,
         fill: 'red',
         draggable: true,
      };
      setShapes([...shapes, newRect]);
   };

   const addCircle = () => {
      const newCircle = {
         id: `circle-${shapes.length}`,
         type: 'circle',
         x: 150,
         y: 150,
         radius: 40,
         fill: 'blue',
         draggable: true,
      };
      setShapes([...shapes, newCircle]);
   };

   const addText = () => {
      const newText = {
         id: `text-${shapes.length}`,
         type: 'text',
         x: 200,
         y: 200,
         text: 'Editable Text',
         fontSize: 20,
         fill: 'black',
         draggable: true,
      };
      setShapes([...shapes, newText]);
   };

   const clearCanvas = () => {
      setShapes([]); 
      setSelectedId(null); 
   };

   const handleSelect = (id) => {
      setSelectedId(id);
   };

   const handleTransform = (id, node) => {
      const updated = shapes.map((shape) => {
         if (shape.id === id) {
         if (shape.type === 'rect') {
            return {
               ...shape,
               x: node.x(),
               y: node.y(),
               width: node.width() * node.scaleX(),
               height: node.height() * node.scaleY(),
            };
         } else if (shape.type === 'circle') {
            return {
               ...shape,
               x: node.x(),
               y: node.y(),
               radius: shape.radius * node.scaleX(), // Only scaleX assumed for simplicity
            };
         } else if (shape.type === 'text') {
            return {
               ...shape,
               x: node.x(),
               y: node.y(),
            };
         }
      }
      return shape;
    });

    // Reset scaling to prevent compounding
    node.scaleX(1);
    node.scaleY(1);

    setShapes(updated);
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addText}>Add Text</button>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>

      <Stage
         width={500}
         height={500}
         style={{ border: '1px solid black' }}
         onMouseDown={(e) => {
            if (e.target === e.target.getStage()) {
            setSelectedId(null);
            }
         }}
      >
        <Layer>
            {shapes.map((shape) => {
               const isSelected = shape.id === selectedId;

               if (!shapeRefs.current[shape.id]) {
                  shapeRefs.current[shape.id] = React.createRef();
               }

               const shapeRef = shapeRefs.current[shape.id];

               const shapeProps = {
                  key: shape.id,
                  x: shape.x,
                  y: shape.y,
                  draggable: shape.draggable,
                  onClick: () => handleSelect(shape.id),
                  onTap: () => handleSelect(shape.id),
                  ref: shapeRef,
                  onTransformEnd: (e) => handleTransform(shape.id, e.target),
                  onDragEnd: (e) => handleTransform(shape.id, e.target),
               };

               if (shape.type === 'rect') {
                  return <Rect {...shapeProps} width={shape.width} height={shape.height} fill={shape.fill} />;
               } else if (shape.type === 'circle') {
                  return <Circle {...shapeProps} radius={shape.radius} fill={shape.fill} />;
               } else if (shape.type === 'text') {
                  return <Text {...shapeProps} text={shape.text} fontSize={shape.fontSize} fill={shape.fill} />;
               }

            return null;
         })}

         {selectedId && (
            <Transformer
               ref={trRef}
               boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                     return oldBox;
                  }
                  return newBox;
               }}
            />
         )}
         </Layer>
      </Stage>
    </>
  );
}

export default Canvas;
