import './Card.scss';

export const Card = ({col}) => (
    <div className='coll-cards' key={col._id}>
        <p className='coll-cards__name'>{col.name}</p>
        <a
            className='coll-cards__site'
            href={`${col.website}`}
            target='blanc'
        >
            {col.website}
        </a>
        <p className='coll-cards__num'>{col.passwords.length} passwords</p>
    </div>
);
