"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./tiles.css";

interface TileState {
  backgroundPosition: string;
  isAnimating: boolean;
}

interface ImageDimensions {
  originalWidth: number;
  originalHeight: number;
  coverWidth: number;
  coverHeight: number;
}

const InteractiveTiles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [tiles, setTiles] = useState<TileState[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mouseDirection, setMouseDirection] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    originalWidth: 0,
    originalHeight: 0,
    coverWidth: 0,
    coverHeight: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  const options = {
    imgSrc: "/background.jpg",

    tileWidth: 120,
    tileHeight: 120,
    mouseTrail: true,
    offset: 60,
  };

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track mouse movement for direction (disabled on mobile)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const directionX = event.movementX || 0;
      const directionY = event.movementY || 0;
      setMouseDirection({ x: directionX, y: directionY });
    };

    if (options.mouseTrail && !isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile]);

  // Initialize component
  useEffect(() => {
    const init = () => {
      const image = new Image();
      image.src = options.imgSrc;
      image.onload = (e) => {
        const currentTarget = e.currentTarget as HTMLImageElement;
        const originalWidth = currentTarget.width;
        const originalHeight = currentTarget.height;

        // Calculate cover dimensions based on viewport
        let coverWidth = window.innerWidth;
        let coverHeight = window.innerHeight;

        if (originalWidth > originalHeight) {
          coverHeight = (originalHeight / originalWidth) * coverWidth;
        } else {
          coverWidth = (originalWidth / originalHeight) * coverHeight;
        }

        setImageDimensions({
          originalWidth,
          originalHeight,
          coverWidth,
          coverHeight,
        });
        setImageLoaded(true);
      };
    };

    init();
  }, []);

  // Check and update tile number based on container size
  const checkTileNumber = useCallback(() => {
    if (!containerRef.current || !holderRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const tilesFitInWindow =
      Math.ceil(containerWidth / options.tileWidth) *
      Math.ceil(containerHeight / options.tileHeight);

    // Calculate holder dimensions
    holderRef.current.style.width =
      Math.ceil(containerWidth / options.tileWidth) * options.tileWidth + "px";
    holderRef.current.style.height =
      Math.ceil(containerHeight / options.tileHeight) * options.tileHeight +
      "px";

    // Create or remove tiles as needed
    const currentTiles = tiles.length;
    let newTiles = [...tiles];

    if (currentTiles < tilesFitInWindow) {
      for (let i = 0; i < tilesFitInWindow - currentTiles; i++) {
        newTiles.push({
          backgroundPosition: "0px 0px",
          isAnimating: false,
        });
      }
    } else if (currentTiles > tilesFitInWindow) {
      newTiles = newTiles.slice(0, tilesFitInWindow);
    }

    setTiles(newTiles);
  }, [tiles, options]);

  // Position image in tiles
  const positionImage = useCallback((tileIndex: number) => {
    const tileElement = tilesRef.current[tileIndex];
    if (!tileElement || !holderRef.current || !containerRef.current) return;

    const left =
      -tileElement.offsetLeft -
      (holderRef.current.offsetLeft - holderRef.current.offsetWidth / 2);
    const top =
      -tileElement.offsetTop -
      (holderRef.current.offsetTop - holderRef.current.offsetHeight / 2);

    return { left, top };
  }, []);

  // Reset image to original position
  const resetImage = useCallback(
    (tileIndex: number) => {
      const position = positionImage(tileIndex);
      if (position) {
        setTiles((prevTiles) => {
          const newTiles = [...prevTiles];
          newTiles[tileIndex] = {
            ...newTiles[tileIndex],
            backgroundPosition: `${position.left}px ${position.top}px`,
            isAnimating: false,
          };
          return newTiles;
        });
      }
    },
    [positionImage],
  );

  // Handle tile hover
  const handleTileHover = useCallback(
    (tileIndex: number) => {
      // Skip interaction on mobile
      if (isMobile) return;

      const tileElement = tilesRef.current[tileIndex];
      if (
        !tileElement ||
        !holderRef.current ||
        !containerRef.current ||
        !imageLoaded
      )
        return;

      const minWidth =
        -containerRef.current.offsetWidth + tileElement.offsetWidth;
      const minHeight =
        -containerRef.current.offsetHeight + tileElement.offsetHeight;

      const basePosition = positionImage(tileIndex);
      if (!basePosition) return;

      let left = basePosition.left;
      let top = basePosition.top;

      if (options.mouseTrail) {
        // Direction-aware movement
        if (mouseDirection.x > 0) {
          left = basePosition.left + options.offset;
        } else if (mouseDirection.x < 0) {
          left = basePosition.left - options.offset;
        }

        if (mouseDirection.y > 0) {
          top = basePosition.top + options.offset;
        } else if (mouseDirection.y < 0) {
          top = basePosition.top - options.offset;
        }
      } else {
        // Random movement
        left = getRandomInt(
          basePosition.left - options.offset,
          basePosition.left + options.offset,
        );
        top = getRandomInt(
          basePosition.top - options.offset,
          basePosition.top + options.offset,
        );
      }

      // Apply bounds
      if (left < minWidth) left = minWidth;
      if (left > 0) left = 0;
      if (top < minHeight) top = minHeight;
      if (top > 0) top = 0;

      // Update tile with animation
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles];
        newTiles[tileIndex] = {
          ...newTiles[tileIndex],
          backgroundPosition: `${left}px ${top}px`,
          isAnimating: true,
        };
        return newTiles;
      });

      // Reset after animation
      setTimeout(() => {
        resetImage(tileIndex);
      }, 1500);
    },
    [imageLoaded, mouseDirection, positionImage, resetImage, options, isMobile],
  );

  // Create tiles when image loads
  useEffect(() => {
    if (imageLoaded) {
      checkTileNumber();
    }
  }, [imageLoaded]);

  // Initialize tile positions
  useEffect(() => {
    if (!imageLoaded || tiles.length === 0 || imageDimensions.coverWidth === 0)
      return;

    const newTiles = tiles.map((_, index) => {
      const position = positionImage(index);
      if (position) {
        return {
          ...tiles[index],
          backgroundPosition: `${position.left}px ${position.top}px`,
        };
      }
      return tiles[index];
    });

    setTiles(newTiles);
  }, [imageLoaded, tiles.length, imageDimensions]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      if (imageLoaded) {
        checkTileNumber();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageLoaded, checkTileNumber]);

  return (
    <div
      className="tileContainer"
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div className="tileHolder" ref={holderRef}>
        {tiles.map((tile, index) => (
          <div
            key={index}
            ref={(el) => {
              tilesRef.current[index] = el;
            }}
            className="tile"
            style={{
              backgroundImage: `url("${options.imgSrc}")`,
              backgroundSize: `${imageDimensions.coverWidth}px ${imageDimensions.coverHeight}px`,
              backgroundPosition: tile.backgroundPosition,
              width: `${options.tileWidth}px`,
              height: `${options.tileHeight}px`,
              opacity: 0.6,
            }}
            onMouseOver={() => handleTileHover(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Utility function
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default InteractiveTiles;
