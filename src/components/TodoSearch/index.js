import "./TodoSearch.css";

function TodoSearch({searchValue, setSearchValue}){

    const onSearchValueChange = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value)
    };

    return (
        <input
            className="TodoSearch"
            placeholder="Name of Task"
            value={searchValue}
            onChange={onSearchValueChange}
        />
    );
}
export { TodoSearch };