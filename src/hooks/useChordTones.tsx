import { Chord } from "@tonaljs/tonal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChord } from "src/state/selectChordSlice";

const notes = [
  ["C", "B#"],
  ["C#", "Db"],
  ["D", "C##", "Ebb"],
  ["D#", "Eb"],
  ["E", "D##", "Fb"],
  ["F", "E#"],
  ["F#", "Gb"],
  ["G", "F##", "Abb"],
  ["G#", "Ab"],
  ["A", "G##", "Bbb"],
  ["B", "A##", "Cb"],
  ["C", "B#"],
  ["C#", "Db"],
  ["D", "C##", "Ebb"],
  ["D#", "Eb"],
  ["E", "D##", "Fb"],
  ["F", "E#"],
  ["F#", "Gb"],
  ["G", "F##", "Abb"],
  ["G#", "Ab"],
  ["A", "G##", "Bbb"],
  ["B", "A##", "Cb"],
];

export const useChordTones = (index: number) => {
  const chord = useSelector(selectChord);
  const [chordToneFlags, setChordToneFlags] = useState<string[]>([""]);
  const [isChordTone, setIsChordTone] = useState(false);

  useEffect(() => {
    if (chordToneFlags[index] === "1") {
      setIsChordTone(true);
    } else {
      setIsChordTone(false);
    }
  }, [chordToneFlags]);

  useEffect(() => {
    let isDiscover = false;
    notes.forEach((note, index) => {
      if (note.includes(Chord.get(chord).tonic!)) {
        if (!isDiscover) {
          setChordToneFlags(
            Array.from(
              "0".repeat(index) +
                Chord.get(chord).chroma +
                "0".repeat(12 - index)
            )
          );
          isDiscover = true;
        }
      }
    });
  }, [chord]);

  return { isChordTone, setIsChordTone };
};