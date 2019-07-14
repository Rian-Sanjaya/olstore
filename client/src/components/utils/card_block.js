import React from 'react'
import Card from './card'

const renderCards = (list) => {
  // console.log('isi list: ', list)

  return list ?
    list.map( (card, i) => {
      return <Card
        key={i}
        {...card}
      />
    })
  : null
    }

const CardBlock = (props) => {
  // console.log('isi list: ', props.list)
  return (
    <div className='card_block'>
      <div className='container'>
        {
          props.title ?
            <div className='title'>
              {props.title}
            </div>
          : null
        }
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  )
}

export default CardBlock