import { toast } from "react-toastify";
import { ADD_WORD, STREAM_ENDED, STREAM_START } from "./descriptionActionTypes";

export const addWords = (newWord) => ({ type: ADD_WORD, payload: newWord });
export const openStream = () => ({ type: STREAM_START });

export const stopStreaming = () => ({
  type: STREAM_ENDED,
});

export const startStreaming = (data) => {
  return async (dispatch, getState) => {
    dispatch(openStream());
    const eventSource = new EventSource(
      "http://localhost:8080/description?module_name=Grammar Basics&level=easy&language=english&lesson_name=Nouns&activity_name=Types of Nouns"
    );
    // `http://localhost:8080/description?module_name=${module_name}&level=${searchData.level}&language=${searchData.language}&lesson_name=${lessonTitle}&activity_name=${activity_name}`

    eventSource.onmessage = (event) => {
      const newWords = event.data.split(" ");
      dispatch(addWords(newWords));
    };

    eventSource.onopen = (event) => {
      console.log("Connection opened");
      dispatch(openStream());
    };

    eventSource.onerror = (error) => {
      console.log("Connection error", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };
};
