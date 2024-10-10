import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  const handleChange = (content) => {
    onChange(content);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={RichTextEditor.modules}
      formats={RichTextEditor.formats}
      theme="snow"
    />
  );
};

// Custom toolbar and formats (with color options)
RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'size': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, 
     { 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff'] }, { 'background': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff'] }], // Add color and background color
    ['link', 'image', 'video'],
    ['clean'] // Remove formatting
  ],
};

RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'color', 'background', // Color and background formats
  'link', 'image', 'video'
];

export default RichTextEditor;
