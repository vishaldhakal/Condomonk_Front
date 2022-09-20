import React from "react";
import Link from "next/link";
import Autosuggest from "react-autosuggest";

class BasicAutoSuggest extends React.Component {
  constructor() {
    super();

    //Define state for value and suggestion collection
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  // Collection of data
  cars = [
    {
      name: "Brampton",
      origin: "ON",
    },
    {
      name: "Mississauga",
      origin: "ON",
    },
    {
      name: "Toronto",
      origin: "ON",
    },
    {
      name: "Milton",
      origin: "ON",
    },
    {
      name: "Vaughan",
      origin: "ON",
    },
    {
      name: "King",
      origin: "ON",
    },
    {
      name: "Cambridge",
      origin: "ON",
    },
    {
      name: "Kitchener",
      origin: "ON",
    },
    {
      name: "Waterloo",
      origin: "ON",
    },
    {
      name: "Ajax",
      origin: "ON",
    },
    {
      name: "Georgetown",
      origin: "ON",
    },
    {
      name: "Innisfil",
      origin: "ON",
    },
    {
      name: "Niagara",
      origin: "ON",
    },
    {
      name: "Thorold",
      origin: "ON",
    },
    {
      name: "Grimsby",
      origin: "ON",
    },
    {
      name: "Calgary",
      origin: "ON",
    },
    {
      name: "Ottawa",
      origin: "ON",
    },
    {
      name: "Aurora",
      origin: "ON",
    },
    {
      name: "Oshawa",
      origin: "ON",
    },
    {
      name: "Barrie",
      origin: "ON",
    },
    {
      name: "Hamilton",
      origin: "ON",
    },
  ];

  // Filter logic
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.cars.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Trigger suggestions
  getSuggestionValue = (suggestion) => suggestion.name;

  // Render Each Option
  renderSuggestion = (suggestion) => (
    <Link href={"/" + suggestion.name.toLowerCase()}>
      <a className="ha-link">
        <span className="d-none d-sm-inline me-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#00b5d6"
            className="bi bi-geo"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
            />
          </svg>
        </span>
        {suggestion.name} | {suggestion.origin}
      </a>
    </Link>
  );

  // OnChange event handler
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    this.props.changeCity(newValue);
  };

  // Suggestion rerender when user types
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Triggered on clear
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  componentDidMount() {
    this.setState({
      value: this.props.defaultVal || " ",
    });
    this.props.changeCity(this.props.defaultVal || " ");
  }

  render() {
    const { value, suggestions } = this.state;

    // Option props
    const inputProps = {
      placeholder: this.props.defc,
      value,
      onChange: this.onChange,
    };

    // Adding AutoSuggest component
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default BasicAutoSuggest;
