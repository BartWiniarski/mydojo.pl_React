import DatePicker from 'react-datepicker';
import { getYear, getMonth } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ selectedDate, onDateChange }) => {
    const range = (start, end) => {
        const length = end - start;
        return Array.from({ length }, (_, i) => start + i);
    };

    const years = range(1900, getYear(new Date()) + 1, 1);
    const months = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"];

    return (
        <DatePicker
            className="form-control"
            placeholderText="Wybierz datę urodzenia"
            renderCustomHeader={({
                                     date,
                                     changeYear,
                                     changeMonth,
                                     decreaseMonth,
                                     increaseMonth,
                                     prevMonthButtonDisabled,
                                     nextMonthButtonDisabled}) => (
                <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) => {
                            changeMonth(months.indexOf(value));
                            onDateChange(date);
                        }}
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
            selected={selectedDate}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
        />
    );
}

export default Calendar;
