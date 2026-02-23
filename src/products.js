import { useState } from 'react'

let products = [
  {
    code: 100,
    price: 100,
    name: 'T-Shirt',
    images: {
      white: '/clothes/img1-1.jpg',
      black: '/clothes/img1-2.jpg',
      blue: '/clothes/img1-3.jpg',
      green: '/clothes/img1-4.jpg'
    },
    size: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    code: 101,
    price: 120,
    name: 'Hoodie',
    images: {
      white: '/clothes/img2-1.jpg',
      black: '/clothes/img2-2.jpg',
      blue: '/clothes/img2-3.jpg',
      green: '/clothes/img2-4.jpg'
    },
    size: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    code: 102,
    price: 110,
    name: 'Shirt',
    images: {
      white: '/clothes/img3-1.jpg',
      black: '/clothes/img3-2.jpg',
      blue: '/clothes/img3-3.jpg',
      green: '/clothes/img3-4.jpg'
    },
    size: ['S', 'M', 'L', 'XL', '2XL']
  }
]

export function Product () {
  const [list, setList] = useState([])
  const [showCart, setShowCart] = useState(true)

  return (
    <div className='min-h-screen'>
      <header className='flex justify-between bg-white pt-4 pb-4 pl-8 pr-8 place-content-center sticky top-0 z-10'>
        <h1 className='text-4xl font-bold text-center '>Products Cards</h1>
        <div className='relative'>
          <button onClick={() => setShowCart(!showCart)} className='text-2xl'>
            🛒
          </button>
          <span className='w-4 h-4 rounded-full bg-green-600 absolute top-0 left-0 text-white text-[11px] text-center'>
            {list.length}
          </span>
        </div>
      </header>
      <div className='flex justify-center items-center gap-5 m-6 flex-wrap'>
        {products.map((product, i) => {
          return (
            <Color key={i} data={product} list={list} onSetList={setList} />
          )
        })}

        <div>
          <Cart
            list={list}
            onSetList={setList}
            showCart={showCart}
            onSetShowCart={setShowCart}
          />
        </div>
      </div>
    </div>
  )
}

function Color ({ data, onSetList, list }) {
  const [size, setSize] = useState('S')
  const [number, setNumber] = useState(1)
  const [color, setcolor] = useState('white')

  return (
    <div key={data.code} className='shadow-xl rounded-2xl bg-gray-100 m-6'>
      <img
        className='w-[280px] h-[250px] rounded-t-2xl rounded-b-2xl'
        src={data.images[color]}
      ></img>

      <div className='p-4 flex justify-between'>
        <div>
          <p className='text-sm font-medium'>
            Code <b className='text-gray-500 text-base'>{data.code}</b>
          </p>
          <p className='text-sm font-medium mt-2'>
            Name <b className='text-base'>{data.name}</b>
          </p>
          <h2 className='text-sm font-medium'>
            Colors
            <select
              className=' rounded-md ml-2 border-1 border-gray-300 m-1 focus:border-gray-300 cursor-pointer font-semibold bg-purple-200  '
              value={color}
              onChange={e => setcolor(e.target.value)}
            >
              {Object.keys(data.images).map((color, index) => {
                return (
                  <option
                    className='text-center font-semibold'
                    value={color}
                    key={index}
                  >
                    {color}
                  </option>
                )
              })}
            </select>
          </h2>
        </div>

        <div>
          <h2 className=' text-sm font-medium'>
            Sizes
            <select
              className=' rounded-md ml-2 border-1 border-gray-300 m-1 focus:border-gray-300 cursor-pointer font-semibold bg-purple-200  '
              value={size}
              onChange={e => setSize(e.target.value)}
            >
              {data.size.map((e, index) => (
                <option key={index} className='text-center font-semibold'>
                  {e}
                </option>
              ))}
            </select>
          </h2>
          <h2 className='text-sm font-medium mt-1'>
            Numbers
            <select
              className=' rounded-md ml-2 border-1 border-gray-300  focus:border-gray-300 cursor-pointer font-semibold bg-purple-200 '
              value={number}
              onChange={e => {
                setNumber(Number(e.target.value))
              }}
            >
              {Array.from({ length: 12 }, (_, i) => {
                return i + 1
              }).map((index, i) => (
                <option key={i} className='text-center font-semibold'>
                  {index}
                </option>
              ))}
            </select>
          </h2>
          <p className='text-sm font-medium mt-1'>
            Price <b className='text-base'>${data.price}</b>
          </p>
        </div>
      </div>
      <button
        className=' p-2 bg-neutral-900 text-neutral-100 w-full hover:bg-neutral-600 hover:text-neutral-950 rounded-b-2xl font-semibold'
        onClick={() =>
          onSetList([
            ...list,
            {
              number,
              size,
              color,
              code: data.code,
              name: data.name,
              price: data.price,
              img: data.images[color]
            }
          ])
        }
      >
        Add to cart
      </button>
    </div>
  )
}
function Cart ({ list, onSetList, onSetShowCart, showCart }) {
  function remove (index) {
    const remove = list.filter((_, i) => i !== index)
    onSetList(remove)
  }

  return (
    <div
      className={
        list.length === 0
          ? 'hidden'
          : showCart
          ? 'fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6 overflow-y-auto '
          : 'hidden'
      }
    >
      <button
        className='bg-slate-200 p-1 mb-4 flex ml-auto'
        onClick={() => onSetShowCart(!showCart)}
      >
        ❌
      </button>
      <h2 className='text-xl font-semibold text-center mb-4'>
        Slected Products
      </h2>
      {list.length > 0 && (
        <div>
          {list.map((details, i) => {
            console.log(details)

            return (
              <div
                key={details.code}
                className='flex bg-white justify-between mb-4 shadow-md'
              >
                <img
                  className='w-[120px] h-[100px] mr-2'
                  src={details.img}
                ></img>
                <div>
                  <p className='text-sm font-medium '>
                    Code: <b className='text-gray-500'>{details.code}</b>
                  </p>
                  <p className='text-sm font-medium'>
                    Name: <b>{details.name}</b>
                  </p>
                  <p className='text-sm font-medium'>
                    Piece: <b>{details.number}</b>
                  </p>
                  <p className='text-sm font-medium'>
                    Size: <b>{details.size}</b>
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium'>
                    Color: <b>{details.color}</b>
                  </p>
                  <p className='text-sm font-medium'>
                    per piece: <b>${details.price}</b>
                  </p>
                  <p className='text-sm font-medium'>
                    Total: <b>${details.number * details.price}</b>
                  </p>
                  <button
                    onClick={() => remove(i)}
                    className='bg-red-500 text-sm text-white p-1 rounded-md'
                  >
                    remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
