import './Card.scss';

export const Card = ({col, toggle}) => (
    <div className='coll-cards' key={col._id} onClick={toggle}>
        <p className='coll-cards__name' title={col.name}>{col.name.length > 10 ? `${col.name.substr(0, 10)}...` : col.name}</p>
        <input type='hidden' defaultValue={col._id} readOnly={true}/>
        <a
            className='coll-cards__site'
            href={`https://${col.website}`}
            target='blanc'
        >
            {col.website}
        </a>
        <div className='bar'>
            <span className='bar-progress' style={{width: `${col.passwords.length / 15 * 100}%`}}></span>
            <span className='bar-num'>{col.passwords.length} / 15 passwords</span>
        </div>
    </div>
);
