import './Card.scss';

export const Card = ({col, toggle}) => (
    <div className='coll-cards' key={col._id} onClick={toggle}>
        <p className='coll-cards__name'>{col.name}</p>
        <input type='hidden' value={col._id} />
        <a
            className='coll-cards__site'
            href={`https://${col.website}`}
            target='blanc'
        >
            {col.website}
        </a>
        <p className='coll-cards__num'>{col.passwords.length} passwords</p>
    </div>
);
