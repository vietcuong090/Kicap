import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import Button from '~/components/Button/Button';
import DataTable from '~/components/DataTable/DataTable';
import ModalConfirm from '~/components/ModalConfirm/ModalConfirm';
import Pagination from '~/components/Pagination/Pagination';
import { useDebounce } from '~/hooks/useDebounce';
import SliderService from '~/services/SliderService';

const ShowSlideBanner = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  const searchDebounce = useDebounce(searchInput, 500);
  const handleOnChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchData = async (payload) => {
    const res = await SliderService.getSliders(payload, dispatch);
    if (res.status === 'OK') {
      setResponse(res);
      const rows = res.data.map((e) => {
        return {
          id: e._id,
          image: e.image,
          description: e.description,
          displayOrder: e.displayOrder,
        };
      });
      setRows(rows);
    }
  };

  useEffect(() => {
    fetchData({ page, search: searchDebounce });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchDebounce]);

  const handleOpenDelete = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    setOpen(false);
    const res = await SliderService.deleteSlider(id, dispatch);
    if (res.status === 'OK') fetchData({ page, search: searchDebounce });
  };

  const handleChangePage = (value) => {
    setPage(value.selected + 1);
  };

  return (
    <div className='slide-banners'>
      <HeadingBreadCrumb>Quản lý slide banner</HeadingBreadCrumb>
      <Box title='Danh sách slide banner'>
        <div className='search-head'>
          <FormSearch
            placeholder='Nhập tên slide banner cần tìm kiếm'
            value={searchInput}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
            name='search'
          />
          <Button secondary className='btn-add' to='/admin/slide/add'>
            Bổ sung
          </Button>
        </div>
        <TextQuantity
          quantity={response.totalSliders ?? 0}
          text='slide banner'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={['Ảnh', 'Mô tả', 'Thứ tự hiển thị']}
          keys={['image', 'description', 'displayOrder']}
          handleOpenDelete={handleOpenDelete}
          updateTo={'slide'}
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={handleChangePage}
        ></Pagination>
      </Box>
      <ModalConfirm
        desc={'Bạn có muốn xoá slide banner này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalConfirm>
    </div>
  );
};

export default ShowSlideBanner;
