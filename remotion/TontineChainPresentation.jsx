import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Img,
} from 'remotion';

// Scène 1: Logo et Titre
const IntroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B6623',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: '#FFD700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            boxShadow: '0 20px 60px rgba(255, 215, 0, 0.4)',
          }}
        >
          <span style={{ fontSize: 100, color: '#0B6623' }}>₣</span>
        </div>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#FFD700',
            margin: 0,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          TontineChain
        </h1>
        <p
          style={{
            fontSize: 32,
            color: 'white',
            marginTop: 20,
          }}
        >
          Tontines Sécurisées par Blockchain 🇧🇯
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scène 2: Le Problème
const ProblemScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const translateY = interpolate(frame, [0, 30], [50, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        padding: 80,
        justifyContent: 'center',
      }}
    >
      <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <h2
          style={{
            fontSize: 60,
            color: '#FF6B6B',
            marginBottom: 40,
            fontWeight: 'bold',
          }}
        >
          ⚠️ Le Problème
        </h2>
        <div style={{ fontSize: 36, color: 'white', lineHeight: 1.6 }}>
          <p>📊 200 milliards FCFA en jeu chaque année</p>
          <p>😰 600+ plaintes de détournement</p>
          <p>📝 Carnets falsifiés, aucune traçabilité</p>
          <p>👩‍💼 70% de femmes entrepreneures victimes</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 3: La Solution
const SolutionScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const scale = spring({
    frame,
    fps: 30,
    config: {
      damping: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B6623',
        padding: 80,
        justifyContent: 'center',
      }}
    >
      <div style={{ opacity }}>
        <h2
          style={{
            fontSize: 60,
            color: '#FFD700',
            marginBottom: 40,
            fontWeight: 'bold',
          }}
        >
          ✨ La Solution Blockchain
        </h2>
        <div style={{ fontSize: 36, color: 'white', lineHeight: 1.6 }}>
          <p style={{ transform: `scale(${scale})` }}>
            🔒 Smart Contracts Immuables
          </p>
          <p>🔍 Transparence Totale</p>
          <p>⚡ Distribution Automatique</p>
          <p>🛡️ Sécurité Absolue</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 4: Comment ça marche
const HowItWorksScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);

  const steps = [
    { icon: '👥', text: 'Créez votre groupe' },
    { icon: '⚙️', text: 'Smart contract déployé' },
    { icon: '💰', text: 'Cotisations sécurisées' },
    { icon: '🎯', text: 'Distribution automatique' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1E40AF',
        padding: 80,
        justifyContent: 'center',
      }}
    >
      <div style={{ opacity }}>
        <h2
          style={{
            fontSize: 60,
            color: '#FFD700',
            marginBottom: 60,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Comment ça marche ?
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {steps.map((step, index) => {
            const stepOpacity = interpolate(
              frame,
              [20 + index * 10, 30 + index * 10],
              [0, 1]
            );
            return (
              <div
                key={index}
                style={{
                  opacity: stepOpacity,
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <div style={{ fontSize: 80, marginBottom: 20 }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 28, fontWeight: 'bold' }}>
                  {index + 1}. {step.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 5: Call to Action
const CTAScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          opacity,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#0B6623',
            marginBottom: 40,
          }}
        >
          Créez votre Tontine Sécurisée
        </h2>
        <div
          style={{
            fontSize: 48,
            color: '#1a1a1a',
            marginBottom: 60,
          }}
        >
          En 2 minutes seulement
        </div>
        <div
          style={{
            transform: `scale(${scale})`,
            backgroundColor: '#0B6623',
            color: 'white',
            padding: '30px 80px',
            borderRadius: 20,
            fontSize: 40,
            fontWeight: 'bold',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          tontinechain.vercel.app
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Composition principale
export const TontineChainPresentation = () => {
  return (
    <AbsoluteFill>
      {/* Scène 1: Intro (0-5s) */}
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>

      {/* Scène 2: Problème (5-11s) */}
      <Sequence from={150} durationInFrames={180}>
        <ProblemScene />
      </Sequence>

      {/* Scène 3: Solution (11-17s) */}
      <Sequence from={330} durationInFrames={180}>
        <SolutionScene />
      </Sequence>

      {/* Scène 4: Comment ça marche (17-24s) */}
      <Sequence from={510} durationInFrames={210}>
        <HowItWorksScene />
      </Sequence>

      {/* Scène 5: CTA (24-30s) */}
      <Sequence from={720} durationInFrames={180}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
