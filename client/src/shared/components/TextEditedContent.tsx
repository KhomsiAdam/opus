import 'quill/dist/quill.snow.css';


const TextEditedContent = ({ content, onClick, ...otherProps }: any) => (
  <div className="ql-snow">
    <div
      className="ql-editor text-[15px] font-normal !p-0"
      dangerouslySetInnerHTML={{ __html: content }}
      onClick={onClick}
      {...otherProps}
    />
  </div>
);

export default TextEditedContent;
