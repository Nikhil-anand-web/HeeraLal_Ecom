"use client"

import Image from 'next/image'
import axios from 'axios';
import tempImg from '../../../public/images/dashboard/ecommerce/img_2.png'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CategoryModel = ({ categoriesList: categoryDetail, setstateRefresherDummyValue }) => {

  const router = useRouter();

  const onDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete? This action cannot be undone.");
    if (!isConfirmed) return;  // Exit if the user cancels the action
    try {
      const res = await axios.delete(`/api/v1/deleteCategory`, {
        data: [{ id: categoryDetail.id }]
      });
      if (res.data.success) {
        toast.success(res.data.message)
        setstateRefresherDummyValue(prev => !prev);
      }
    } catch (error) {
      console.log(error, "error")
      toast.warning(error.response.data.message)
    }
  }

  const onStatusFlip = async () => {
    try {
      const res = await axios.post('/api/v1/categoryStatusToggle', { id: categoryDetail.id });
      if (res.data.success) {
        toast.success(res.data.message)
        setstateRefresherDummyValue(prev => !prev);
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message);
    }
  }

  const onClickEdit = () => {
    router.push(`/wah-control-center/updateCategoy/${categoryDetail.id}`);
  }
  const OnClickViewPro = () => {
    router.push(`/wah-control-center/products/${categoryDetail.slug}`);
  }

  if (!categoryDetail) {
    return <div>The category is empty</div>;
  }

  const onClickModel = () => {
    router.push(`/wah-control-center/categoryDetails/${categoryDetail.id}`);
  }

  return (
    <div  id={categoryDetail.id} className="card mb-3 category-card shadow-sm" style={styles.card}>
      <div className="row g-0 align-items-center">
        <div onClick={onClickModel} className="col-3">
          <Image alt="Category Image" width={100} height={100} style={styles.image} src={categoryDetail.image[0]?.url || tempImg} />
        </div>
        <div onClick={onClickModel}  className="col-7">
          <div className="card-body py-2 px-3">
            <h6 className="card-title mb-1" style={styles.title}>Category: {categoryDetail.categoryName}</h6>
            <p className="card-text mb-1" style={styles.text}><small>Slug: {categoryDetail.slug}</small></p>
            <p className="card-text mb-1" style={styles.text}><small>Parent: {categoryDetail.parent ? categoryDetail.parent.categoryName : "Root"}</small></p>
          </div>
        </div>
        <div className="col-2 d-flex flex-column align-items-end">
          <button onClick={onClickEdit} className="btn btn-sm mb-2" style={styles.editButton}>
            Edit
          </button>
          <button onClick={onDelete} className="btn btn-sm mb-2" style={styles.deleteButton}>
            Delete
          </button>
          {!categoryDetail.status ? (
            <button onClick={onStatusFlip} className="btn btn-sm mb-2" style={styles.activateButton}>
              Activate
            </button>
          ) : (
            <button onClick={onStatusFlip} className="btn btn-sm mb-2" style={styles.deactivateButton}>
              Deactivate
            </button>
          )}
          <button onClick={OnClickViewPro} className="btn btn-sm mb-2" style={styles.editButton}>
            View Products
          </button>
         
          
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: '12px',
    backgroundColor: '#f7f7f7',
    cursor: 'pointer',
    padding: '10px',
    transition: '0.3s all ease',
  },
  image: {
    height: '100px',
    width: '100px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: '14px',
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  activateButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  deactivateButton: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
  }
};

export default CategoryModel;
