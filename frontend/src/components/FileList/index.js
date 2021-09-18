import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Container, FileInfo, Preview } from "./styles";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

const FileList = ({ files }) => (
  <Container>
    {files.map((uploadedFile) => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}
              {!!uploadedFile.url && (
                <button onClick={() => {}}>Excluir</button>
              )}
            </span>
          </div>
        </FileInfo>
        <div>
          {/* display if not finalized and not error */}
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: "#7159c1" },
              }}
              strokeWidth={10}
              percentage={uploadedFile.progress}
            />
          )}
          {/* if uploaded display url */}
          {uploadedFile.url && (
            <a
              href={`${uploadedFile.url}`}
              target="_blank"
              rel={"noopener noreferrer"}
            >
              <MdLink style={{ marginRight: 8 }} size={24} color={"#222"} />
            </a>
          )}
          {/* if uploaded display the check */}
          {uploadedFile.uploaded && (
            <MdCheckCircle size={24} color={"#78e5d5"} />
          )}
          {/* if error display the error */}
          {uploadedFile.error && <MdError size={24} color={"#e57878"} />}
        </div>
      </li>
    ))}
  </Container>
);

export default FileList;
