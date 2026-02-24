import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Sequence,
	staticFile,
	useCurrentFrame,
} from 'remotion';

// Complete dataset for the Yo-Yo IR1 fitness test
const rawData = [
	{"level": 1, "speedLevel": 5, "shuttle": 1, "speed": 10.0, "distance": 40},
	{"level": 2, "speedLevel": 9, "shuttle": 1, "speed": 12.0, "distance": 80},
	{"level": 3, "speedLevel": 11, "shuttle": 1, "speed": 13.0, "distance": 120},
	{"level": 4, "speedLevel": 11, "shuttle": 2, "speed": 13.0, "distance": 160},
	{"level": 5, "speedLevel": 12, "shuttle": 1, "speed": 13.5, "distance": 200},
	{"level": 6, "speedLevel": 12, "shuttle": 2, "speed": 13.5, "distance": 240},
	{"level": 7, "speedLevel": 12, "shuttle": 3, "speed": 13.5, "distance": 280},
	{"level": 8, "speedLevel": 13, "shuttle": 1, "speed": 14.0, "distance": 320},
	{"level": 9, "speedLevel": 13, "shuttle": 2, "speed": 14.0, "distance": 360},
	{"level": 10, "speedLevel": 13, "shuttle": 3, "speed": 14.0, "distance": 400},
	{"level": 11, "speedLevel": 13, "shuttle": 4, "speed": 14.0, "distance": 440},
	{"level": 12, "speedLevel": 14, "shuttle": 1, "speed": 14.5, "distance": 480},
	{"level": 13, "speedLevel": 14, "shuttle": 2, "speed": 14.5, "distance": 520},
	{"level": 14, "speedLevel": 14, "shuttle": 3, "speed": 14.5, "distance": 560},
	{"level": 15, "speedLevel": 14, "shuttle": 4, "speed": 14.5, "distance": 600},
	{"level": 16, "speedLevel": 14, "shuttle": 5, "speed": 14.5, "distance": 640},
	{"level": 17, "speedLevel": 14, "shuttle": 6, "speed": 14.5, "distance": 680},
	{"level": 18, "speedLevel": 14, "shuttle": 7, "speed": 14.5, "distance": 720},
	{"level": 19, "speedLevel": 14, "shuttle": 8, "speed": 14.5, "distance": 760},
	{"level": 20, "speedLevel": 15, "shuttle": 1, "speed": 15.0, "distance": 800},
	{"level": 21, "speedLevel": 15, "shuttle": 2, "speed": 15.0, "distance": 840},
	{"level": 22, "speedLevel": 15, "shuttle": 3, "speed": 15.0, "distance": 880},
	{"level": 23, "speedLevel": 15, "shuttle": 4, "speed": 15.0, "distance": 920},
	{"level": 24, "speedLevel": 15, "shuttle": 5, "speed": 15.0, "distance": 960},
	{"level": 25, "speedLevel": 15, "shuttle": 6, "speed": 15.0, "distance": 1000},
	{"level": 26, "speedLevel": 15, "shuttle": 7, "speed": 15.0, "distance": 1040},
	{"level": 27, "speedLevel": 15, "shuttle": 8, "speed": 15.0, "distance": 1080},
	{"level": 28, "speedLevel": 16, "shuttle": 1, "speed": 15.5, "distance": 1120},
	{"level": 29, "speedLevel": 16, "shuttle": 2, "speed": 15.5, "distance": 1160},
	{"level": 30, "speedLevel": 16, "shuttle": 3, "speed": 15.5, "distance": 1200},
	{"level": 31, "speedLevel": 16, "shuttle": 4, "speed": 15.5, "distance": 1240},
	{"level": 32, "speedLevel": 16, "shuttle": 5, "speed": 15.5, "distance": 1280},
	{"level": 33, "speedLevel": 16, "shuttle": 6, "speed": 15.5, "distance": 1320},
	{"level": 34, "speedLevel": 16, "shuttle": 7, "speed": 15.5, "distance": 1360},
	{"level": 35, "speedLevel": 16, "shuttle": 8, "speed": 15.5, "distance": 1400},
	{"level": 36, "speedLevel": 17, "shuttle": 1, "speed": 16.0, "distance": 1440},
	{"level": 37, "speedLevel": 17, "shuttle": 2, "speed": 16.0, "distance": 1480},
	{"level": 38, "speedLevel": 17, "shuttle": 3, "speed": 16.0, "distance": 1520},
	{"level": 39, "speedLevel": 17, "shuttle": 4, "speed": 16.0, "distance": 1560},
	{"level": 40, "speedLevel": 17, "shuttle": 5, "speed": 16.0, "distance": 1600},
	{"level": 41, "speedLevel": 17, "shuttle": 6, "speed": 16.0, "distance": 1640},
	{"level": 42, "speedLevel": 17, "shuttle": 7, "speed": 16.0, "distance": 1680},
	{"level": 43, "speedLevel": 17, "shuttle": 8, "speed": 16.0, "distance": 1720},
	{"level": 44, "speedLevel": 18, "shuttle": 1, "speed": 16.5, "distance": 1760},
	{"level": 45, "speedLevel": 18, "shuttle": 2, "speed": 16.5, "distance": 1800},
	{"level": 46, "speedLevel": 18, "shuttle": 3, "speed": 16.5, "distance": 1840},
	{"level": 47, "speedLevel": 18, "shuttle": 4, "speed": 16.5, "distance": 1880},
	{"level": 48, "speedLevel": 18, "shuttle": 5, "speed": 16.5, "distance": 1920},
	{"level": 49, "speedLevel": 18, "shuttle": 6, "speed": 16.5, "distance": 1960},
	{"level": 50, "speedLevel": 18, "shuttle": 7, "speed": 16.5, "distance": 2000},
	{"level": 51, "speedLevel": 18, "shuttle": 8, "speed": 16.5, "distance": 2040},
	{"level": 52, "speedLevel": 19, "shuttle": 1, "speed": 17.0, "distance": 2080},
	{"level": 53, "speedLevel": 19, "shuttle": 2, "speed": 17.0, "distance": 2120},
	{"level": 54, "speedLevel": 19, "shuttle": 3, "speed": 17.0, "distance": 2160},
	{"level": 55, "speedLevel": 19, "shuttle": 4, "speed": 17.0, "distance": 2200},
	{"level": 56, "speedLevel": 19, "shuttle": 5, "speed": 17.0, "distance": 2240},
	{"level": 57, "speedLevel": 19, "shuttle": 6, "speed": 17.0, "distance": 2280},
	{"level": 58, "speedLevel": 19, "shuttle": 7, "speed": 17.0, "distance": 2320},
	{"level": 59, "speedLevel": 19, "shuttle": 8, "speed": 17.0, "distance": 2360},
	{"level": 60, "speedLevel": 20, "shuttle": 1, "speed": 17.5, "distance": 2400},
	{"level": 61, "speedLevel": 20, "shuttle": 2, "speed": 17.5, "distance": 2440},
	{"level": 62, "speedLevel": 20, "shuttle": 3, "speed": 17.5, "distance": 2480},
	{"level": 63, "speedLevel": 20, "shuttle": 4, "speed": 17.5, "distance": 2520},
	{"level": 64, "speedLevel": 20, "shuttle": 5, "speed": 17.5, "distance": 2560},
	{"level": 65, "speedLevel": 20, "shuttle": 6, "speed": 17.5, "distance": 2600},
	{"level": 66, "speedLevel": 20, "shuttle": 7, "speed": 17.5, "distance": 2640},
	{"level": 67, "speedLevel": 20, "shuttle": 8, "speed": 17.5, "distance": 2680},
	{"level": 68, "speedLevel": 21, "shuttle": 1, "speed": 18.0, "distance": 2720},
	{"level": 69, "speedLevel": 21, "shuttle": 2, "speed": 18.0, "distance": 2760},
	{"level": 70, "speedLevel": 21, "shuttle": 3, "speed": 18.0, "distance": 2800},
	{"level": 71, "speedLevel": 21, "shuttle": 4, "speed": 18.0, "distance": 2840},
	{"level": 72, "speedLevel": 21, "shuttle": 5, "speed": 18.0, "distance": 2880},
	{"level": 73, "speedLevel": 21, "shuttle": 6, "speed": 18.0, "distance": 2920},
	{"level": 74, "speedLevel": 21, "shuttle": 7, "speed": 18.0, "distance": 2960},
	{"level": 75, "speedLevel": 21, "shuttle": 8, "speed": 18.0, "distance": 3000},
	{"level": 76, "speedLevel": 22, "shuttle": 1, "speed": 18.5, "distance": 3040},
	{"level": 77, "speedLevel": 22, "shuttle": 2, "speed": 18.5, "distance": 3080},
	{"level": 78, "speedLevel": 22, "shuttle": 3, "speed": 18.5, "distance": 3120},
	{"level": 79, "speedLevel": 22, "shuttle": 4, "speed": 18.5, "distance": 3160},
	{"level": 80, "speedLevel": 22, "shuttle": 5, "speed": 18.5, "distance": 3200},
	{"level": 81, "speedLevel": 22, "shuttle": 6, "speed": 18.5, "distance": 3240},
	{"level": 82, "speedLevel": 22, "shuttle": 7, "speed": 18.5, "distance": 3280},
	{"level": 83, "speedLevel": 22, "shuttle": 8, "speed": 18.5, "distance": 3320},
	{"level": 84, "speedLevel": 23, "shuttle": 1, "speed": 19.0, "distance": 3360},
	{"level": 85, "speedLevel": 23, "shuttle": 2, "speed": 19.0, "distance": 3400},
	{"level": 86, "speedLevel": 23, "shuttle": 3, "speed": 19.0, "distance": 3440},
	{"level": 87, "speedLevel": 23, "shuttle": 4, "speed": 19.0, "distance": 3480},
	{"level": 88, "speedLevel": 23, "shuttle": 5, "speed": 19.0, "distance": 3520},
	{"level": 89, "speedLevel": 23, "shuttle": 6, "speed": 19.0, "distance": 3560},
	{"level": 90, "speedLevel": 23, "shuttle": 7, "speed": 19.0, "distance": 3600},
	{"level": 91, "speedLevel": 23, "shuttle": 8, "speed": 19.0, "distance": 3640},
];

const FPS = 30;
const START_COUNTDOWN = 5 * FPS; // 5-second get ready phase

// Convert table calculations down to precise frame segments
let currentFrameCount = START_COUNTDOWN;
const PROCESSED_DATA = rawData.map((level) => {
	const runSeconds = 144 / level.speed; // Total time for 40m distance (2 x 20m)
	const runFrames = Math.round(runSeconds * FPS);
	const halfRunFrames = Math.round((runSeconds / 2) * FPS);
	const recoveryFrames = 10 * FPS; // 10 second standardized active recovery

	const startFrame = currentFrameCount;
	const turnFrame = currentFrameCount + halfRunFrames;
	const finishFrame = currentFrameCount + runFrames;
	const endFrame = finishFrame + recoveryFrames;

	currentFrameCount = endFrame;

	return {
		...level,
		startFrame,
		turnFrame,
		finishFrame,
		endFrame,
	};
});

// Extract exact beep frames
const BEEPS: number[] = [];
PROCESSED_DATA.forEach((l) => {
	BEEPS.push(l.startFrame);
	BEEPS.push(l.turnFrame);
	BEEPS.push(l.finishFrame);
});
BEEPS.push(currentFrameCount); // Add a beep for total test completion

export const TOTAL_FRAMES = currentFrameCount;
export { FPS };

// Generic Status Box Component
const StatBox = ({ label, value }: { label: string; value: React.ReactNode }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			margin: '10px',
			padding: '30px 20px',
			backgroundColor: '#1F2937',
			borderRadius: '15px',
			minWidth: '250px',
			boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
			borderTop: '4px solid #4B5563',
		}}
	>
		<div style={{ fontSize: '24px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
			{label}
		</div>
		<div style={{ fontSize: '64px', fontWeight: 'bold', color: '#F9FAFB', fontVariantNumeric: 'tabular-nums' }}>
			{value}
		</div>
	</div>
);

export const YoYoTestVideo = () => {
	const frame = useCurrentFrame();

	let phaseText = '';
	let timeLeft = 0;
	let progress = 0;
	let stateColor = '';

	const currentLevel = PROCESSED_DATA.find(
		(l) => frame >= l.startFrame && frame < l.endFrame
	);

	// Determine Timer/Phase Logic based on precise frames
	if (frame < START_COUNTDOWN) {
		phaseText = 'GET READY';
		timeLeft = (START_COUNTDOWN - frame) / FPS;
		progress = frame / START_COUNTDOWN;
		stateColor = '#F59E0B'; // Amber
	} else if (!currentLevel) {
		phaseText = 'TEST COMPLETED';
		timeLeft = 0;
		progress = 1;
		stateColor = '#10B981'; // Green
	} else {
		if (frame < currentLevel.turnFrame) {
			phaseText = 'RUN OUT (20m)';
			timeLeft = (currentLevel.turnFrame - frame) / FPS;
			progress = (frame - currentLevel.startFrame) / (currentLevel.turnFrame - currentLevel.startFrame);
			stateColor = '#3B82F6'; // Blue
		} else if (frame < currentLevel.finishFrame) {
			phaseText = 'RUN BACK (20m)';
			timeLeft = (currentLevel.finishFrame - frame) / FPS;
			progress = (frame - currentLevel.turnFrame) / (currentLevel.finishFrame - currentLevel.turnFrame);
			stateColor = '#8B5CF6'; // Purple
		} else {
			phaseText = 'ACTIVE RECOVERY';
			timeLeft = (currentLevel.endFrame - frame) / FPS;
			progress = (frame - currentLevel.finishFrame) / (currentLevel.endFrame - currentLevel.finishFrame);
			stateColor = '#10B981'; // Green
		}
	}

	const activeLevel =
		frame < START_COUNTDOWN
			? PROCESSED_DATA[0]
			: currentLevel || PROCESSED_DATA[PROCESSED_DATA.length - 1];

	// Map visualizer layout position (0% - 100%)
	let runnerPos = 0;
	if (phaseText.includes('OUT')) runnerPos = progress;
	else if (phaseText.includes('BACK')) runnerPos = 1 - progress;

	return (
		<AbsoluteFill style={{ backgroundColor: '#111827', color: 'white', fontFamily: 'sans-serif' }}>

			{/* AUDIO: beep.wav exists in the `public` folder */}
			{/* The 60 frame duration limit ensures memory optimization for lengthy compositions */}
			{BEEPS.map((beepFrame, idx) => (
				<Sequence key={idx} from={beepFrame} durationInFrames={60}>
					<Audio src={staticFile('beep.wav')} />
				</Sequence>
			))}

			<div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px' }}>
				{/* Top Info */}
				<div style={{ textAlign: 'center', marginBottom: '40px' }}>
					<h1 style={{ fontSize: '50px', margin: '0 0 10px 0', color: '#F3F4F6' }}>
						Yo-Yo Intermittent Recovery Test - Level 1
					</h1>
					<h2 style={{ fontSize: '26px', margin: 0, color: '#9CA3AF' }}>
						Audio &amp; Visual Cues
					</h2>
				</div>

				{/* Center Action */}
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<div style={{ fontSize: '70px', fontWeight: 'bold', color: stateColor, textTransform: 'uppercase' }}>
						{phaseText}
					</div>
					<div style={{ fontSize: '220px', fontWeight: '900', margin: '30px 0', fontVariantNumeric: 'tabular-nums' }}>
						{Math.max(0, timeLeft).toFixed(1)}s
					</div>

					{/* Distance Track Visualizer */}
					<div style={{ width: '80%', margin: '60px 0' }}>
						<div style={{ position: 'relative', width: '100%', height: '12px', backgroundColor: '#374151', borderRadius: '6px' }}>

							{/* Track boundary Markers */}
							<div style={{ position: 'absolute', left: 0, top: '-15px', height: '42px', width: '4px', backgroundColor: '#9CA3AF' }} />
							<div style={{ position: 'absolute', right: 0, top: '-15px', height: '42px', width: '4px', backgroundColor: '#9CA3AF' }} />

							{/* Track Labels */}
							<div style={{ position: 'absolute', left: '-50px', top: '-12px', color: '#9CA3AF', fontSize: '24px', fontWeight: 'bold' }}>0m</div>
							<div style={{ position: 'absolute', right: '-65px', top: '-12px', color: '#9CA3AF', fontSize: '24px', fontWeight: 'bold' }}>20m</div>

							{/* Runner Position Blob */}
							<div
								style={{
									position: 'absolute',
									top: '-14px',
									left: `${runnerPos * 100}%`,
									width: '40px',
									height: '40px',
									borderRadius: '50%',
									backgroundColor: stateColor,
									transform: 'translateX(-50%)',
									opacity: phaseText.includes('RECOVERY') ? (Math.sin((frame / FPS) * Math.PI * 4) * 0.3 + 0.7) : 1,
									boxShadow: '0 0 15px rgba(0,0,0,0.5)',
								}}
							/>
						</div>
					</div>
				</div>

				{/* Bottom Statistical Grid */}
				<div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 'auto' }}>
					<StatBox label="Total Level" value={activeLevel.level} />
					<StatBox label="Speed Level" value={activeLevel.speedLevel} />
					<StatBox label="Shuttles" value={activeLevel.shuttle} />
					<StatBox label="Speed" value={`${activeLevel.speed.toFixed(1)} km/h`} />
					<StatBox label="Acc. Dist." value={`${activeLevel.distance} m`} />
				</div>
			</div>
		</AbsoluteFill>
	);
};
