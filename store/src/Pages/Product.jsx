import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {message, Button, Form, Input, InputNumber, Modal, Space, Table, Upload,} from 'antd';


function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log('Token:', token);


  const handleFinish = async (values) => {
    const formData = new FormData();
    const image = values.image?.[0]?.originFileObj;

    formData.append('product_name', values.product_name);
    formData.append('price', values.price);
    formData.append('description', values.description);
    if (image) formData.append('image', image);

    const url = editingProduct
      ? `http://localhost:5000/products/${editingProduct._id}`
      : 'http://localhost:5000/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        message.success(`Product ${editingProduct ? 'updated' : 'added'} successfully`);
        setIsModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        const errorData = await res.json();
        message.error(errorData?.msg || 'Failed to save product');
      }
    } catch (error) {
      message.error('Network error');
    }
  };


  const [form]= Form.useForm();
  useEffect(()=>{
    if(editingProduct){
      form.setFieldValue({
        product_name: editingProduct.product_name,
        price: editingProduct.price,
        description: editingProduct.description,
        image: editingProduct.image
        ?
        [{
              uid: '-1',
              name: 'Current Image',
              status: 'done',
              url: `http://localhost:5000/uploads/${editingProduct.image}`,
        },
      ]
      :
      [],
      });
    }
    else{
      form.resetFields()
    }
  },
[editingProduct])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        message.success('Product deleted successfully');
        fetchProducts();
      } else {
        message.error('Failed to delete product');
      }
    } catch (error) {
      message.error('Network error');
    }
  };

  const columns = [
    {
      title: 'No',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={`http://localhost:5000/uploads/${image}`}
          alt="product"
          style={{ width: '50px' }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingProduct(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
        style={{ margin: '20px' }}
      >
        Add New Product
      </Button>

      <Table
        columns={columns}
        dataSource={products || []}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalOpen}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        footer={null}
      >
        <Form
        form= {form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            product_name: editingProduct?.product_name,
            price: editingProduct?.price,
            description: editingProduct?.description,
            image: editingProduct?.image
              ? [
                  {
                    uid: '-1',
                    name: 'Current Image',
                    status: 'done',
                    url: `http://localhost:5000/uploads/${editingProduct.image}`,
                  },
                ]
              : [],
          }}
        >
          <Form.Item
            name="product_name"
            label="Product Name"
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Product Price"
            rules={[{ required: true, message: 'Please input product price!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Product Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Product Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload maxCount={1} beforeUpload={() => false} listType="picture">
              <Button type="primary">Upload File</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {editingProduct ? 'Update' : 'Save'}
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default Product;
