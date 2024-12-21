import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router'
import { Empty } from 'antd'
import axios from 'axios'

import Header from '@/components/Header';
import Heading from '@/components/Heading';
import OrderRow from '@/components/OrderManagementPage/OrderRow';
import ReactPaginate from 'react-paginate';

// let fakeOrderList = [
//     {
//         order_id: "71852912157786",
//         state_id: 1,
//         state_name: "Chờ Xác Nhận",
//         created_at: "2023-03-04T03:50:21.000Z",
//         total_order_value: 13450000
//     },
//     {
//         order_id: "71852912157786",
//         state_id: 2,
//         state_name: "Đã Xác Nhận",
//         created_at: "2023-03-04T03:50:21.000Z",
//         total_order_value: 13450000
//     },
//     {
//         order_id: "71852912157786",
//         state_id: 3,
//         state_name: "Đang Vận Chuyển",
//         created_at: "2023-03-04T03:50:21.000Z",
//         total_order_value: 13450000
//     },
//     {
//         order_id: "71852912157786",
//         state_id: 4,
//         state_name: "Đã Giao",
//         created_at: "2023-03-04T03:50:21.000Z",
//         total_order_value: 13450000
//     },
//     {
//         order_id: "71852912157786",
//         state_id: 5,
//         state_name: "Đã Hủy",
//         created_at: "2023-03-04T03:50:21.000Z",
//         total_order_value: 13450000
//     },
//     {
//         order_id: "71852912157786",
//         state_id: 6,
//         state_name: "Hủy Bởi Shop",
//         created_at: "2023-03-04T03:50:21.000Z",
//         total_order_value: 13450000
//     },
// ];

const OrderManagementPage = () => {
    let [orderList, setOrderList] = useState([]);
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    console.log('orderList', orderList)
    useEffect(() => {
        const getOrderList = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/order/admin/list')
                setOrderList(result.data)
            } catch (err) {
                console.log(err);
                // setOrderList(fakeOrderList);
            }
        }
        getOrderList();
    }, [])

    const refreshOrderTable = async () => {
        try {
            const result = await axios.get('http://localhost:8080/api/order/admin/list')
            setOrderList(result.data)
        } catch (err) {
            console.log(err);
            setOrderList(fakeOrderList);
        }
    }
    const orders = useMemo(() => {
        return [...orderList.filter(order => ['COD'].includes(order?.type)).slice(pagesVisited, pagesVisited + usersPerPage)]
    }, [orderList, pagesVisited, usersPerPage])

    
  const pageCount = Math.ceil(orderList.filter(order => ['COD'].includes(order?.type)).length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    return (
        <div className="">
            <Header title="Quản Lý Đơn Hàng Thủ Công" />
            <div className="wrapper manager-box">
                <Heading title="Tất cả đơn hàng" />
                <div className="wrapper-product-admin table-responsive">
                    <table className='table order-manage-table w-100'>
                        <thead className="w-100 align-middle text-center">
                            <tr className="fs-6 w-100">
                                <th title='Mã đơn hàng' className="col-order-id">
                                    Mã đơn hàng
                                </th>
                                <th title='Trạng thái' className="col-state">Trạng thái</th>
                                <th title="Ngày tạo" className="col-create-at">Ngày tạo</th>
                                <th title='Tổng giá trị' className="col-total-value">Tổng giá trị</th>
                                <th title="Thao tác" className="col-action manipulation">Thao tác</th>
                            </tr>
                        </thead>
                    </table>
                    {
                        orders.length ?
                        orders.map((order, index) => {
                                return (
                                    <OrderRow
                                        key={index}
                                        order_id={order.order_id}
                                        state_id={order.state_id}
                                        state_name={order.state_name}
                                        created_at={order.created_at}
                                        total_order_value={order.total_order_value}
                                        refreshOrderTable={refreshOrderTable}
                                    />
                                );
                            })
                            :
                            <table className="table w-100 table-hover align-middle table-bordered" style={{ height: "400px" }}>
                                <tbody>
                                    <tr><td colSpan={6}><Empty /></td></tr>
                                </tbody>
                            </table>
                    }
                </div>
            </div>
            <div className='row mt-10'>
                <div className='col-6'></div>
                <div className='col-6'>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
                </div>
            </div>
        </div>
    )
}

export default OrderManagementPage