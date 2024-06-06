import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import CategoryService from '~/services/CategoryService';
import { categorySchema } from '~/validate/YupSchema';

const AddCategory = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      description: '',
    },
    validationSchema: categorySchema,
    onSubmit: async (payload, { setSubmitting, resetForm }) => {
      await CategoryService.createCategory(payload, dispatch);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung danh mục sản phẩm</HeadingBreadCrumb>

      <Box title='Thông tin danh mục sản phẩm'>
        <form>
          <Input
            labelName='Tên danh mục sản phẩm'
            placeholder='Nhập tên danh mục sản phẩm'
            required
            name='categoryName'
            formik={formik}
          />
          <Input
            labelName='Mô tả'
            placeholder='Nhập mô tả danh mục sản phẩm'
            type='text'
            name='description'
            formik={formik}
            textarea
          />

          <ButtonAction to='/admin/categories' handleSave={formik.handleSubmit} />
        </form>
      </Box>
    </div>
  );
};

export default AddCategory;
