export default function ChildComponent (props){
    return (
        <div className={`alert alert-${props.color}`}>
            {props.text}
        </div>
    )
}