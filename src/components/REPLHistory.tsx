import '../styles/main.css';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    count : number;
    list : string[]
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.list.map(value => {
                return <p key={props.list.indexOf(value)}>{value}</p>;
            })}
        </div>
    );
}