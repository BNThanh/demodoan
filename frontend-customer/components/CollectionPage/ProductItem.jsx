import React from 'react'
import { StarFilled } from '@ant-design/icons'
import { frontendAPI } from '@/config'
import { formatRate } from '@/helpers/format'
import Link from "next/link";
import { useRouter } from 'next/router';

const ProductItem = (props) => {
    const router = useRouter()
    return (
        <div className='product-item'>
            <Link href={{ pathname: `/product/${props.product_id}`, query: { colour: props.colour_id } }}>
                <div className="position-relative img-box">
                    <img className='img' style={{height: '400px', maxHeight: '400px', objectFit: 'cover'}} src={props.img} alt="" />

                    <div className="size-box position-absolute">
                        {
                            props.sizes.map((item, index) => {
                                return (
                                    <span onClick={() => {
                                            router.push({
                                                pathname: `/product/${props.product_id}`,
                                                query: { size: item },
                                            })
                                      }} className="size-item d-inline-block text-center" key={index}>{item}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </Link>
            <div className="infor-product">
                <Link href={{ pathname: `/product/${props.product_id}`, query: { colour: props.colour_id } }}>
                    <h6>{props.name} {props?.colour_name}</h6>
                </Link>
                <div className='d-flex justify-content-start'>
                    <p className='price-after text-danger fw-bold'>{props.price}đ</p>
                </div>
            </div>
        </div>
    )
}

export default ProductItem