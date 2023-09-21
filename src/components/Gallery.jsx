import React, { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import imagesList from "../data/images";
import { useDrag, useDrop } from "react-dnd";
import Loading from "./Loading";

const Card = ({ image, index, id, moveImage }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div className="relative md:mx-0 mx-[5%]" ref={ref} style={{ opacity }}>
      <img src={image.image} className="card-image" alt="" />
      <p className="text-lg absolute top-2 right-2 py-2 px-4 rounded-md bg-slate-600 text-white">
        {image.tag}
      </p>
    </div>
  );
};

const Gallery = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth token");
    if (authToken) {
      navigate("/gallery");
    }

    if (!authToken) {
      navigate("/auth");
    }
  }, []);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const moveImage = useCallback((dragIndex, hoverIndex) => {
    setSearchResults((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedImages = imagesList;
      setSearchResults(fetchedImages);
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const searchedImages = imagesList.filter((image) =>
      image.tag.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(searchedImages.reverse());
  }, [imagesList, search]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">
          <Loading />
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="md:mx-[8%] my-[3%] mx-[4%] ">
        <div className="flex md:flex-row flex-col justify-between gap-4 items-center">
          <h2 className="text-3xl font-semibold">User's Gallery</h2>
          <input
            id="search"
            type="text"
            placeholder="Search gallery"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {searchResults.length ? (
          <div className="mt-8 mb-4 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-10">
            {searchResults.map((image, index) => (
              <Card
                key={image.id}
                id={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-8">
            <p className="text-xl">No image found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
