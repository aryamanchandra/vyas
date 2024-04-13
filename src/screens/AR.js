import { useRef, useState, useCallback } from "react";
import {
  ViroARScene,
  ViroNode,
  ViroARPlane,
  ViroARPlaneSelector,
  Viro3DObject,
  ViroSpotLight,
  ViroMaterials,
  ViroQuad,
  ViroARSceneNavigator,
  ViroAnimations,
  ViroBox,
} from "@viro-community/react-viro";

// const AR = () => {
//   const arNodeRef = useRef(null);
//   const spotLightRef = useRef(null);
//   const [scale, setScale] = useState([1, 1, 1]);
//   const [object, setObject] = useState(null);

//   const _onPinch = useCallback(
//     (pinchState, scaleFactor, source) => {
//       console.log("_onPinch");
//       var newScale = scale.map((x) => {
//         return x * scaleFactor;
//       });

//       if (pinchState === 3) {
//         setScale(newScale);
//         return;
//       }
//       arNodeRef.current.setNativeProps({ scale: newScale });
//       spotLightRef.current.setNativeProps({ shadowFarZ: 6 * newScale[0] });
//     },
//     [scale]
//   );

//   const _onPlaneSelected = (anchor) => {
//     setObject({
//       type: "Object",
//       objectPath:
//         "../assets/uploads_files_4823879_Couleur-Locale-Namar-roped-rattan-spherical-lamp-2020-obj.obj",
//       scale: [0.5, 0.5, 0.5],
//       position: anchor.position,
//       rotation: anchor.orientation,
//     });
//   };

//   ViroMaterials.createMaterials({
//     white: {
//       diffuseColor: "rgba(255,255,255,1)",
//     },
//   });

//   return (
//     <ViroARScene>
//       <ViroARPlaneSelector
//         minHeight={0.5}
//         minWidth={0.7}
//         onPlaneSelected={_onPlaneSelected}
//       >
//         <ViroNode
//           position={[0, -0.5, -1]}
//           dragType="FixedToWorld"
//           animation={{ name: "appear", run: true, loop: true }} // We have defined our animation at the top;
//           onDrag={() => {}}
//         >
//           {/* Spotlight to cast light on the object and a shadow on the surface, see
//              the Viro documentation for more info on lights & shadows */}
//           <ViroSpotLight
//             innerAngle={5}
//             outerAngle={45}
//             direction={[0, -1, -0.2]}
//             position={[0, 3, 0]}
//             color="#ffffff"
//             castsShadow={true}
//             influenceBitMask={4}
//             shadowMapSize={2048}
//             shadowNearZ={2}
//             shadowFarZ={5}
//             shadowOpacity={0.7}
//           />
//           <Viro3DObject
//             source={object}
//             position={[0, 0.01, 0]}
//             scale={[0.03, 0.03, 0.03]}
//             type="OBJ"
//             lightReceivingBitMask={5}
//             shadowCastingBitMask={4}
//             // transformBehaviors={['billboardY']}
//             resources={[
//               require("../assets/Couleur Locale Namar roped rattan spherical lamp-001.jpg"),
//               require("../assets/Couleur Locale Namar roped rattan spherical lamp-002.jpg"),
//               require("../assets/Couleur Locale Namar roped rattan spherical lamp-003.jpg"),
//               require("../assets/Couleur Locale Namar roped rattan spherical lamp-004.jpg"),
//               require("../assets/Couleur Locale Namar roped rattan spherical lamp-005.jpg"),
//               require("../assets/Couleur Locale Namar roped rattan spherical lamp-006.jpg"),
//             ]}
//             materials={["white"]} // We have defined material at the top;
//           />
//           <ViroQuad
//             rotation={[-90, 0, 0]}
//             width={0.5}
//             height={0.5}
//             arShadowReceiver={true}
//             lightReceivingBitMask={4}
//           />
//         </ViroNode>
//       </ViroARPlaneSelector>
//     </ViroARScene>
//   );
// };

// export default AR;

import React from "react";
import { StyleSheet } from "react-native";

/**
 * Every 3D object will require materials to display texture on body.
 * We have to create all materials before we use them with our elements.
 */
ViroMaterials.createMaterials({
  /**
   * Material in its simplest form is just diffused color
   */
  white: {
    diffuseColor: "rgba(255,255,255,1)",
  },
  /**
   * We can also diffuse a texture here.
   */
  grid: {
    diffuseTexture: require("../assets/icon.png"),
  },
});

ViroAnimations.registerAnimations({
  /** To begin with we have added simple rotation animation */
  rotate: {
    properties: {
      rotateY: "+=90",
    },
    duration: 2500, //.25 seconds
  },
});

const BoxTexture = () => {
  const onInitialized = (arSceneState, reason) => {
    console.log(reason);
  };

  return (
    /** ViroARScene will open up AR enabled camera in your scene */
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/**
       * Here us our ViroBox a 3D element with position in AR space
       */}
      {/* <ViroBox
        position={[0, -0.5, -1]}
        animation={{name: 'rotate', run: true, loop: true}} // We have defined our animation at the top;
        scale={[0.3, 0.3, 0.1]}
        materials={['grid']} // We have defined material at the top;
    /> */}
      <Viro3DObject
        source={require('../assets/uploads_files_3547922_Kawm.obj')}
        position={[0, 0.01, 0]}
        scale={[0.03, 0.03, 0.03]}
        type="OBJ"
        lightReceivingBitMask={5}
        shadowCastingBitMask={4}
        // transformBehaviors={['billboardY']}
        resources={[
          require("../assets/Couleur Locale Namar roped rattan spherical lamp-001.jpg"),
          require("../assets/Couleur Locale Namar roped rattan spherical lamp-002.jpg"),
          require("../assets/Couleur Locale Namar roped rattan spherical lamp-003.jpg"),
          require("../assets/Couleur Locale Namar roped rattan spherical lamp-004.jpg"),
          require("../assets/Couleur Locale Namar roped rattan spherical lamp-005.jpg"),
          require("../assets/Couleur Locale Namar roped rattan spherical lamp-006.jpg"),
        ]}
        materials={["white"]} // We have defined material at the top;
      />
    </ViroARScene>
  );
};

export default () => {
  // All AR scene will reside in ViroARSceneNavigator:
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: BoxTexture,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
});
