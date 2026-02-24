import React from "react";
import { Composition } from "remotion";
import { YoYoTestVideo, TOTAL_FRAMES, FPS } from "./Composition";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="YoYoTestVideo"
				component={YoYoTestVideo}
				durationInFrames={TOTAL_FRAMES}
				fps={FPS}
				width={1920}
				height={1080}
			/>
		</>
	);
};
