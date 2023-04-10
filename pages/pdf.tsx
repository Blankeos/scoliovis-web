import useHasMounted from "@/hooks/useHasMounted";
import { PDFViewer } from "@react-pdf/renderer";
import ScolioVisDocument from "components/MainAppPage/ScolioVisDocument";
import React, { useState } from "react";

const PDFPage = () => {
  const hasMounted = useHasMounted();
  const [rerender, setRerender] = useState<boolean>(true);

  if (!hasMounted) return <>Loading</>;
  return (
    <div className="min-h-screen">
      <button className="px-5 py-2" onClick={() => setRerender(!rerender)}>
        Re-render
      </button>
      {/* {rerender && ( */}
      <PDFViewer className="h-[40rem] bg-green-500 w-[30rem]">
        <ScolioVisDocument
          data={{
            imageSrc: "http://localhost:3000/example_images/1.jpg",
            curveType: "C",
            ptAngle: 22.41,
            mtAngle: 49.2,
            tlAngle: 19.53,
            summaryStatement:
              "The greatest bend is found at MT: 49.20° taken from the superior endplate of (6) and inferior endplate of (14).",
          }}
        />
      </PDFViewer>
      {JSON.stringify(rerender)}
      {/* )} */}
    </div>
  );
};

export default PDFPage;
