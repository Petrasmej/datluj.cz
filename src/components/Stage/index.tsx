import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

interface generateWordProps {
  size: number;
}

const generateWord: React.FC<generateWordProps> = (size) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage: React.FC = () => {
  const [words, setWords] = useState<string[]>(['jahoda', 'malina', 'rybiz']);
  const [mistakes, setMistakes] = useState<number>(0);

  const handleFinish = () => {
    setWords((oldWords) => {
      const newWord = generateWord(6);
      return [...oldWords.slice(1), newWord];
    });
  };

  const handleMistake = () => {
    setMistakes((oldMistakes) => oldMistakes + 1);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>{' '}
      <div className="stage__words">
        {' '}
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            onMistake={handleMistake}
            active={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
