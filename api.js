export const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const res = await fetch(url);

  // fetch 사용 시, response의 ok를 꼭 검사해야 올바른 호출이 됐는지 체크할 수 있다. 아래 문서에서 참고할 수 있다.
  // https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetc
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (res.ok) {
    const json = await res.json();
    return json;
  }

  throw new Error("요청에 실패함");
};

export const fetchLanguages = async (keyword) =>
  request(`${API_END_POINT}/languages?keyword=${keyword}`);
