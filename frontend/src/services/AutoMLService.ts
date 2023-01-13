import http from "../http-common";

const upload = (file: File, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();
  formData.append("file", file);

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const preview = (filename: string): Promise<any> => {
  return http.post(
    "/preview",
    { filename },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const setup = (filename: string): Promise<any> => {
  return http.post(
    "/setup",
    { filename },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const train = (
  filename: string,
  inputColumns: string[],
  outputColumns: string[]
): Promise<any> => {
  return http.post(
    "/train",
    { filename, inputColumns, outputColumns },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const test = (
  filename: string,
  payload: Record<string, string>,
  outputColumns: string[]
): Promise<any> => {
  return http.post(
    "/test",
    { filename, payload, outputColumns },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const AutoMLService = {
  upload,
  preview,
  setup,
  train,
  test,
};

export default AutoMLService;
