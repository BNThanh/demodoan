import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";

import Heading from '../Heading'
import { swalert, swtoast } from '@/mixins/swal.mixin'
import { homeAPI } from '@/config'

// const fakeSizeList = [
//     { size_id: 1, size_name: "S" },
//     { size_id: 2, size_name: "M" },
//     { size_id: 3, size_name: "L" },
// ]

const SizeManage = () => {
    const [sizeList, setSizeList] = useState([])

    useEffect(() => {
        const getSizeList = async () => {
            try {
                const result = await axios.get(`${homeAPI}/size/list`)
                setSizeList(result.data)
            } catch (err) {
                console.log(err)
                // setSizeList(fakeSizeList)
            }
        }
        getSizeList()
    }, [])

    const refreshSizetTable = async () => {
        try {
            const result = await axios.get(homeAPI + '/size/list')
            setSizeList(result.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateSize = async () => {
        const { value: newSize } = await Swal.fire({
            title: 'Nhập tên size mới',
            input: 'text',
            inputLabel: '',
            inputPlaceholder: 'Tên size mới..',
            showCloseButton: true,
        })
        if (!newSize) {
            swtoast.fire({
                text: "Thêm size mới không thành công!"
            })
            return
        }
        if (newSize) {
            try {
                await axios.post(homeAPI + '/size/create',
                    {
                        size_name: newSize
                    })
                refreshSizetTable()
                swtoast.success({
                    text: 'Thêm size mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi thêm size mới vui lòng thử lại!'
                })
            }
        }
    }

    const handleDelete = async (id) => {
        swalert
            .fire({
                title: "Xóa size",
                icon: "warning",
                text: "Bạn muốn xóa size này?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const {data} = await axios.delete('http://localhost:8080/api/size/delete',
                            { data: { size_id: id } })
                            if(data?.success) {
                                refreshSizetTable()
                                swtoast.success({
                                    text: 'Xóa size thành công!'
                                })
                            }
                       
                       
                    } catch (err) {
                        console.log(err)
                        refreshSizetTable()
                        swtoast.error({
                            text: 'Xảy ra lỗi khi xóa size vui lòng thử lại!'
                        })
                    }
                }
            })
    }
    return (
        <div className="catalog-management-item">
            <Heading title="Tất cả size" />
            <div className='create-btn-container'>
                <button className='btn btn-dark btn-sm' onClick={handleCreateSize}>Tạo size</button>
            </div>
            <div className='table-container' style={{ height: "220px" }}>
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th className='text-center'>STT</th>
                            <th>
                                Tên size
                            </th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sizeList.map((size, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{size.size_name}</td>
                                        <td onClick={async () => await handleDelete(size?.size_id)} style={{color: 'red', cursor: 'pointer'}}>Xóa</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SizeManage