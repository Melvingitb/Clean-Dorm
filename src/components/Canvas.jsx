import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import '../css/canvas.css';

function Canvas() {
   const [shapes, setShapes] = useState([]);
   const [selectedId, setSelectedId] = useState(null);
   const [editingTextId, setEditingTextId] = useState(null);
   const [editingValue, setEditingValue] = useState('');
   const [editingPosition, setEditingPosition] = useState({ x: 0, y: 0 });
   const [shapeLabel, setShapeLabel] = useState('');
   const [error, setError] = useState('');
   const stageRef = useRef(null);
   const trRef = useRef();
   const shapeRefs = useRef({});

   const [stageSize, setStageSize] = useState({
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.7,
   });

   useEffect(() => {
      const handleResize = () => {
         setStageSize({
         width: window.innerWidth * 0.8,
         height: window.innerHeight * 0.7,
         });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
      if (selectedId && trRef.current && shapeRefs.current[selectedId]) {
         trRef.current.nodes([shapeRefs.current[selectedId].current]);
         trRef.current.getLayer().batchDraw();
      }
   }, [selectedId]);

   const addRectangle = () => {
      if (!shapeLabel.trim()) {
         setError('Please enter a label before adding a shape!');
         return;
      }

      const newRect = {
      id: `rect-${shapes.length}`,
      type: 'rect',
      x: stageSize.width / 2 - 50,
      y: stageSize.height / 2 - 30,
      width: 100,
      height: 60,
      fill: 'red',
      draggable: true,
      label: shapeLabel,
      };
      setShapes([...shapes, newRect]);
      setShapeLabel('');
      setError('');
   };

   const addCircle = () => {
      if (!shapeLabel.trim()) {
         setError('Please enter a label before adding a shape!');
         return;
      }

      const newCircle = {
         id: `circle-${shapes.length}`,
         type: 'circle',
         x: stageSize.width / 2,
         y: stageSize.height / 2,
         radius: 40,
         fill: 'blue',
         draggable: true,
         label: shapeLabel,
      };
      setShapes([...shapes, newCircle]);
      setShapeLabel('');
      setError('');
   };

   const addText = () => {
      const newText = {
         id: `text-${shapes.length}`,
         type: 'text',
         x: stageSize.width / 2,
         y: stageSize.height / 2,
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
      setEditingTextId(null);
   };

   const deleteItem = () => {
      if (selectedId) {
         setShapes(shapes.filter((shape) => shape.id !== selectedId));
         setSelectedId(null);
         setEditingTextId(null);
      }
   };

   const handleSelect = (id) => {
      const shape = shapes.find((s) => s.id === id);
      if (shape?.type === 'text') {
         setEditingTextId(id);
         setEditingValue(shape.text);
         setEditingPosition({ x: shape.x, y: shape.y });
      }
      setSelectedId(id);
   };

   const handleTransform = (id, node) => {
      const updated = shapes.map((shape) => {
      if (shape.id === id) {
         const scaleX = node.scaleX();
         const scaleY = node.scaleY();
 
         if (shape.type === 'rect') {
            return {
               ...shape,
               x: node.x(),
               y: node.y(),
               width: node.width() * scaleX,
               height: node.height() * scaleY,
            };
         } else if (shape.type === 'circle') {
            return {
               ...shape,
               x: node.x(),
               y: node.y(),
               radius: shape.radius * scaleX,
            };
         } else if (shape.type === 'text') {
            return {
               ...shape,
               x: node.x(),
               y: node.y(),
               fontSize: shape.fontSize * scaleY,
            };
         }
      }
      return shape;
   });
 
   node.scaleX(1);
   node.scaleY(1);
 
   setShapes(updated);
};

  return (
    <>
      <div id="btn-group">
         <input type="text" placeholder="Enter label for your shape" value={shapeLabel} onChange={(e) => setShapeLabel(e.target.value)}/>
         <button className="canvas-btn" onClick={addRectangle}>Add Rectangle</button>
         <button className="canvas-btn" onClick={addCircle}>Add Circle</button>
         <button className="canvas-btn" onClick={addText}>Add Text</button>
         <button className="canvas-btn" onClick={deleteItem}>Delete Item</button>
         <button className="canvas-btn" onClick={clearCanvas}>Clear Canvas</button>
         {error && <div id="error-msg">{error}</div>}
      </div>

      <div style={{ position: 'relative' }}>
         <Stage
            ref={stageRef}
            id="canvas-stage"
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={(e) => {
               if (editingTextId) return; // Don't deselect while editing
               if (e.target === e.target.getStage()) {
               setSelectedId(null);
               setEditingTextId(null);
               }
            }}
         >
            <Layer>
               {shapes.map((shape) => {
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

                  const elements = [];

                  if (shape.type === 'rect') {
                     elements.push(
                        <Rect {...shapeProps} width={shape.width} height={shape.height} fill={shape.fill} />
                     );
                  } else if (shape.type === 'circle') {
                     elements.push(
                        <Circle {...shapeProps} radius={shape.radius} fill={shape.fill} />
                     );
                  } else if (shape.type === 'text') {
                     elements.push(
                        <Text {...shapeProps} text={shape.text} fontSize={shape.fontSize} fill={shape.fill} />
                     );
                  }
              
                  if (shape.label && shape.type == 'rect') {
                     elements.push(
                        <Text
                           key={`${shape.id}-label`}
                           x={shape.x+10}
                           y={shape.y+10} 
                           text={shape.label}
                           fontSize={16}
                           fill="black"
                           fontStyle="bold"
                     />
                  );
                  } else if (shape.label && shape.type == 'circle') {
                     elements.push(
                        <Text
                           key={`${shape.id}-label`}
                           x={shape.x-15}
                           y={shape.y-15} 
                           text={shape.label}
                           fontSize={16}
                           fill="black"
                           fontStyle="bold"
                        />
                     );
                  }
              
               return elements;
               // if (shape.type === 'rect') {
               //    return <Rect {...shapeProps} width={shape.width} height={shape.height} fill={shape.fill} />;
               // } else if (shape.type === 'circle') {
               //    return <Circle {...shapeProps} radius={shape.radius} fill={shape.fill} />;
               // } else if (shape.type === 'text') {
               //    return <Text {...shapeProps} text={shape.text} fontSize={shape.fontSize} fill={shape.fill} />;
               // }

            //    return (
            //       <React.Fragment key={shape.id}>
            //          {shape.type === 'rect' && (
            //             <Rect {...shapeProps} width={shape.width} height={shape.height} fill={shape.fill} />
            //          )}
            //          {shape.type === 'circle' && (
            //             <Circle {...shapeProps} radius={shape.radius} fill={shape.fill} />
            //          )}
            //          {shape.label && (
            //             <Text x={shape.x} y={shape.y - 25} text={shape.label} fontSize={16} fill="black" align="center"/>
            //          )}
            //          {shape.type === 'text' && (
            //             <Text {...shapeProps} text={shape.text} fontSize={shape.fontSize} fill={shape.fill} />
            //          )}
            //       </React.Fragment>
            //    );
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

            {/* return null;
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
         )} */}
         </Layer>
      </Stage>

      {editingTextId && (
         <textarea
            id="text-editor"
            style={{
               top: editingPosition.y,
               left: editingPosition.x,
            }}
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onBlur={() => {
               setShapes((prevShapes) =>
                  prevShapes.map((s) =>
                     s.id === editingTextId ? { ...s, text: editingValue } : s
                  )
               );
               setEditingTextId(null);
            }}
            autoFocus
            />
         )}
      </div>
    </>
  );
}

export default Canvas;
