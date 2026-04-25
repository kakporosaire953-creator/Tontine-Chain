import React from 'react';
import { Composition } from 'remotion';
import { TontineChainPresentation } from './TontineChainPresentation';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TontineChainPresentation"
        component={TontineChainPresentation}
        durationInFrames={900} // 30 secondes à 30 FPS
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: 'TontineChain',
          titleColor: '#FFD700',
        }}
      />
    </>
  );
};
