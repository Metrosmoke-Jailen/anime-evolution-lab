import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextFrame } from "../features/timeline/timelineSlice";

export default function useTimelinePlayer() {
  const dispatch = useDispatch();
  const { isPlaying, speed } = useSelector((s) => s.timeline);
  const total = useSelector(
    (s) => s.characterEvolution.evolutionTimeline.length
  );

  useEffect(() => {
    if (!isPlaying || total === 0) return;

    const id = setInterval(() => {
      dispatch(nextFrame());
    }, 800 / Math.max(1, speed));

    return () => clearInterval(id);
  }, [isPlaying, speed, total, dispatch]);
}