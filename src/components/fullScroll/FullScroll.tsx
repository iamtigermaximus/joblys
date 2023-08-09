import React, { useState, useEffect, CSSProperties } from 'react';
import {
  Container,
  FullScrollContent,
  FullScrollPage1,
  FullScrollPageContent,
} from './FullScroll.styles';

interface Answer {
  id: number;
  type: string;
  value: string;
}

interface FullScrollProps {
  isRequiredQuestionAnswered: () => boolean;
  answers: Answer[];
  handleShowError: (show: boolean) => void;
  checkIfLastQuestion: () => void;
  currentQuestionId: number;
  children: React.ReactNode;
}

interface FullScrollPageProps {
  children: React.ReactNode;
}

//For individual pages
const FullScrollPage = (props: FullScrollPageProps) => {
  const { children } = props;
  return (
    <FullScrollPage1>
      <FullScrollPageContent>{children}</FullScrollPageContent>
    </FullScrollPage1>
  );
};

function FullScroll(props: FullScrollProps) {
  const {
    answers,
    handleShowError,
    currentQuestionId,
    isRequiredQuestionAnswered,
    checkIfLastQuestion,
  } = props;

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pages = React.Children.toArray(props.children);
  const SCROLL_THRESHOLD = 30;

  const isQuestion = (pageIndex: number) => {
    if (pageIndex === 0) {
      return false;
    }
    return true;
  };

  const handleNextQuestion = (pageIndex: number) => {
    // dont scroll if required not filled
    if (isQuestion(pageIndex) && !isRequiredQuestionAnswered()) {
      handleShowError(true);
      return pageIndex;
    }

    return Math.min(pageIndex + 1, pages.length - 1);
  };

  const handlePrevQuestion = (pageIndex: number) => {
    handleShowError(false);

    return Math.max(pageIndex - 1, 0);
  };

  const getNextIndex = (prevPageIndex: number, delta: number) => {
    return delta > 0
      ? handleNextQuestion(prevPageIndex)
      : handlePrevQuestion(prevPageIndex);
  };

  useEffect(() => {
    let isScrolling = false;
    let startY: number;

    const handleTouchStart = (event: React.TouchEvent<Element>) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: React.TouchEvent<Element>) => {
      const deltaY = startY - event.touches[0].clientY;
      // Check if the current page has reached the top or bottom
      const container = event.target as HTMLDivElement;
      const isAtTop = container.scrollTop === 0;
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      if (!isScrolling && Math.abs(deltaY) > SCROLL_THRESHOLD) {
        if ((deltaY > 0 && !isAtBottom) || (deltaY < 0 && !isAtTop)) {
          // Prevent default scrolling behavior
          event.preventDefault();
          const scrollY = container.scrollTop + deltaY;
          container.scrollTo({
            top: scrollY,
            behavior: 'smooth',
          });
        } else {
          // Allow normal scrolling behavior
          isScrolling = true;
          const delta = Math.sign(deltaY);
          setCurrentPageIndex((prevPageIndex) =>
            getNextIndex(prevPageIndex, delta)
          );

          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    const handleWheel = (event: React.WheelEvent<Element>) => {
      const delta = Math.sign(event.deltaY);

      // Check if the current page has reached the top or bottom
      const container = event.target as HTMLDivElement;
      const isAtTop = container.scrollTop === 0;
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      if (!isScrolling && Math.abs(event.deltaY) > SCROLL_THRESHOLD) {
        if ((delta > 0 && !isAtBottom) || (delta < 0 && !isAtTop)) {
          // Prevent default scrolling behavior
          event.preventDefault();
          const scrollY = container.scrollTop + event.deltaY;
          container.scrollTo({
            top: scrollY,
            behavior: 'smooth',
          });
        } else {
          // Allow normal scrolling behavior
          isScrolling = true;
          setCurrentPageIndex((prevPageIndex) =>
            getNextIndex(prevPageIndex, delta)
          );

          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart as any);
    window.addEventListener('touchmove', handleTouchMove as any);
    window.addEventListener('wheel', handleWheel as any, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart as any);
      window.removeEventListener('touchmove', handleTouchMove as any);
      window.removeEventListener('wheel', handleWheel as any);
    };
  }, [answers, currentQuestionId, getNextIndex]);

  const containerStyle: CSSProperties = {
    transform: `translateY(-${currentPageIndex * (100 / pages.length)}%)`,
    scrollSnapType: 'y mandatory',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
  };

  const updateNextPage = () => {
    console.log('updateNextPage function called');

    // Check if the current question is answered and valid
    if (isRequiredQuestionAnswered()) {
      console.log('Collected Data:', answers);
      console.table(answers);
      checkIfLastQuestion();
      setCurrentPageIndex((prevPageIndex) => handleNextQuestion(prevPageIndex));
    } else {
      handleShowError(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      console.log('Ctrl + Enter pressed');
      checkIfLastQuestion();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Enter pressed');
      updateNextPage();
    }
  };

  function addPropsToReactElement(element: React.ReactElement) {
    if (React.isValidElement(element)) {
      let clonedChildP = React.cloneElement(element as React.ReactElement, {
        updateNextPage,
      });

      return clonedChildP;
    }
    return element;
  }

  function addPropsToChildren(children: React.ReactNode) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children as React.ReactElement);
    }
    return children.map((childElement) => addPropsToReactElement(childElement));
  }
  return (
    <Container tabIndex={0} onKeyDown={handleKeyDown}>
      <FullScrollContent style={containerStyle}>
        {pages.map((page, index) => (
          <FullScrollPage key={index}>
            {addPropsToChildren(page)}
          </FullScrollPage>
        ))}
      </FullScrollContent>
    </Container>
  );
}

export default FullScroll;
