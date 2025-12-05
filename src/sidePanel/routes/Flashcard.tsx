import React, { useState } from 'react';
import { Container, Button, Form, Modal, ListGroup } from 'react-bootstrap';
import './Flashcard.css';

interface FlashcardData {
  question: string;
  answer: string;
}

const Flashcard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([
    { question: "Q1", answer: "A1" },
    { question: "Q2", answer: "A2" },
    { question: "Q3", answer: "A3" }
  ]);
  const [showManage, setShowManage] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleAddCard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setFlashcards([...flashcards, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
      setShowAdd(false);
    }
  };

  const handleRemoveCard = (index: number) => {
    const updated = flashcards.filter((_, i) => i !== index);
    setFlashcards(updated);
    if (currentIndex >= updated.length && updated.length > 0) {
      setCurrentIndex(updated.length - 1);
    }
  };

  if (flashcards.length === 0) {
    return (
      <Container className="background">
        <div className="no-flashcards">
          <h3>No flashcards available</h3>
          <p>Create some flashcards to get started!</p>
          <Button variant="primary" onClick={() => setShowAdd(true)} style={{ marginTop: '20px' }}>Add Flashcard</Button>
        </div>
        <Modal show={showAdd} onHide={() => setShowAdd(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Flashcard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control as="textarea" rows={3} value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Enter question" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Answer</Form.Label>
                <Form.Control as="textarea" rows={3} value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Enter answer" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCard}>Add Card</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <Container className="background">
      <div className="header-actions">
        <h2>Flashcards</h2>
        <div>
          <Button variant="outline-secondary" size="sm" onClick={() => setShowAdd(true)} style={{ marginRight: '10px' }}>+ Add</Button>
          <Button variant="outline-secondary" size="sm" onClick={() => setShowManage(true)}>Manage Deck</Button>
        </div>
      </div>
      <span className="card-counter">{currentIndex + 1} / {flashcards.length}</span>

      <section key={currentIndex} className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <article className="flashcard-front">
          <strong>Question</strong>
          <p>{currentCard.question}</p>
          <small>Click to flip</small>
        </article>
        <article className="flashcard-back">
          <strong>Answer</strong>
          <p>{currentCard.answer}</p>
          <small>Click to flip</small>
        </article>
      </section>

      <nav className="flashcard-controls">
        <Button variant="outline-primary" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
        <Button variant="outline-primary" onClick={handleFlip}>{isFlipped ? 'Show Question' : 'Show Answer'}</Button>
        <Button variant="outline-primary" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>Next</Button>
      </nav>

      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Flashcard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows={3} value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Enter question" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Answer</Form.Label>
              <Form.Control as="textarea" rows={3} value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Enter answer" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddCard}>Add Card</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showManage} onHide={() => setShowManage(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manage Deck ({flashcards.length} cards)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <ListGroup>
            {flashcards.map((card, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <strong>Q:</strong> {card.question}
                  <br />
                  <strong>A:</strong> {card.answer}
                </div>
                <Button variant="danger" size="sm" onClick={() => handleRemoveCard(index)}>Remove</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setShowManage(false); setShowAdd(true); }}>+ Add Card</Button>
          <Button variant="secondary" onClick={() => setShowManage(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Flashcard;