import useHasMounted from "@/hooks/useHasMounted";
import { BlobProvider, Document, Page, Text } from "@react-pdf/renderer";
import MyDoc from "components/MainAppPage/TestDocument";

const MyMyDoc = MyDoc;

const PDF2Page = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;

  return (
    <div>
      <BlobProvider document={MyMyDoc}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          return (
            <div>
              There's something going on on the fly
              <button
                className="bg-red-200 px-5 py-2 rounded"
                onClick={(e) => {
                  // window.open(url || "", "newwindow", "width=300,height=250");
                  const a = document.createElement("a");
                  a.href = url || "";
                  a.setAttribute("target", "_blank");
                  a.click();
                }}
              >
                Click me
              </button>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
};

export default PDF2Page;
