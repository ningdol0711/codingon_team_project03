import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill, { Quill } from "react-quill"
import { ImageResize } from 'quill-image-resize-module-ts';
import Header from '../components/Header'
import GreenBtn from '../components/GreenBtn';
import axios from 'axios';
import { ProProps } from '../types/types';
import { useNavigate } from 'react-router-dom';

const BACKHOST = process.env.REACT_APP_BACK_HOST;

Quill.register("modules/ImageResize", ImageResize);

export default function ReviewPostPage() {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);

  const ImageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const selectedFiles = input.files;
      if (!selectedFiles) return;
      let filesArray = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      const formData = new FormData();
      filesArray.forEach((file, i) => {
        formData.append('rev_img', file);
      });
      let quillObj = quillRef.current?.getEditor();
      const range = quillObj?.getSelection();
      if (!range) return;
      try {
        const res = await axios.post(`${BACKHOST}/reviews/img`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        let imgUrl = res.data.urls;
        if (Array.isArray(imgUrl)) {
          imgUrl.forEach((url) => {
            quillObj?.insertEmbed(range.index, 'image', url);
          });
        } else {
          quillObj?.insertEmbed(range.index, 'image', imgUrl);
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
        handlers: {
          image: ImageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const [fileName, setFileName] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      setFile(files[0]);
    } else {
      setFileName('');
      setFile(null);
    }
  };

  const [products, setProducts] = useState<ProProps[]>([]);
  const [rating, setRating] = useState<String>('');
  const [title, setTitle] = useState<String>('');
  const [content, setContent] = useState<String>('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const [categorySelect, setCategorySelect] = useState<String>("");

  useEffect(() => {
    axios
      .get(`${BACKHOST}/products?category=${categorySelect}`)
      .then((response) => {
        setProducts(response.data.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [categorySelect]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategorySelect(event.target.value);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: string) => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const images = div.getElementsByTagName('img');

    while (images.length > 0) {
      images[0].parentNode?.removeChild(images[0]);
    }
    setContent(div.innerHTML);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('rev_title', title as string);
    formData.append('rev_text', content as string);
    formData.append('rev_rating', rating as string);
    formData.append('prod_idx', selectedProduct);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('rev_img', files[i]);
      }
    }

    if (file) {
      formData.append('rev_authImg', file);
    }

    axios
      .post(`${BACKHOST}/reviews`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert(response.data.message)
        navigate('/reviewlist');
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        alert("리뷰 인증 이미지를 함께 올려주세요!")
      });
  };

  return (
    <>
      <Header />
      <div className='revpg_post_selec'>
        <select name="" id="" onChange={handleCategoryChange}>
          <option value="">----- 카테고리 -----</option>
          <option value="냉장고">냉장고</option>
          <option value="에어컨">에어컨</option>
          <option value="세탁기">세탁기</option>
          <option value="TV">TV</option>
          <option value="정수기">정수기</option>
          <option value="공기청정기">공기청정기</option>
          <option value="청소기">청소기</option>
        </select>
        <select name="" id="" onChange={handleProductChange}>
          <option value="">----- 제품명 -----</option>
          {products.map((product) => {
            return <option key={product.prod_idx} value={product.prod_idx}>{product.prod_name}</option>;
          })}
        </select>
        <select name="" id="" onChange={handleRatingChange}>
          <option value="">----- 별점 -----</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="revpg_post_content">
        <input type="text" className='revpg_post_input' placeholder='제목을 입력해주세요.'
          onChange={handleTitleChange} />
        <ReactQuill
          ref={quillRef}
          className='revpg_post_text'
          modules={modules}
          onChange={handleContentChange} />
      </div>

      <div className='revpg_foot_container'>
        <div className="revpg_foot_upload">
          <label htmlFor="file-upload" className="revpg_foot_label">
            파일 선택
          </label>
          <input id="file-upload" type="file" className="revpg_foot_file" onChange={handleFileChange} />

          {fileName ? <p className="file-name">선택된 파일: {fileName}</p> : <p className="description">
            여기에 인증 사진을 올려주세요
          </p>}
        </div>
        <GreenBtn greenBtn_txt='작성' width='150px' height='80px' onClick={handleSubmit} />
      </div>
    </>
  )
}
