'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styles = require('material-ui/styles');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DemoTheme = {
  brand: {
    primary: '#000000',
    secondary: '#E0E0E0'
  },
  distances: {
    halfPrimary: '4px',
    primary: '9px',
    secondary: '4px',
    tertiary: '20px'
  },
  sizes: {
    primary: '18px',
    secondary: '13px',
    tertiary: '30px',
    linkHeader: '40px',
    linkHeaderSmall: '24px',
    minWidth: '325',
    maxWidth: '400'
  }
};

var theme = {
  spacing: _styles.spacing,
  zIndex: _styles.zIndex,
  fontFamily: 'Open Sans Condensed Light',
  palette: {
    primary3Color: _styles.colors.lightBlack,
    accent1Color: _styles.colors.darkBlack,
    accent2Color: _styles.colors.grey100,
    accent3Color: _styles.colors.grey500,
    textColor: _styles.colors.darkBlack,
    alternateTextColor: _styles.colors.white,
    canvasColor: _styles.colors.white,
    borderColor: _styles.colors.grey300,
    disabledColor: (0, _colorManipulator.fade)(_styles.colors.darkBlack, 0.3),
    shadowColor: _styles.colors.fullBlack
  },

  distances: {
    halfPrimary: DemoTheme.distances.halfPrimary,
    primary: DemoTheme.distances.primary,
    secondary: DemoTheme.distances.secondary,
    tertiary: DemoTheme.distances.tertiary
  },
  brand: {
    primary: DemoTheme.brand.primary,
    secondary: DemoTheme.brand.secondary
  },
  sizes: {
    primary: DemoTheme.sizes.primary,
    secondary: DemoTheme.sizes.secondary,
    tertiary: DemoTheme.sizes.tertiary,
    minWidth: DemoTheme.sizes.minWidth,
    maxWidth: DemoTheme.sizes.maxWidth
  },

  datePicker: {
    textColor: _styles.colors.white,
    calendarTextColor: _styles.colors.darkBlack,
    selectTextColor: _styles.colors.white
  },

  timePicker: {
    clockCircleColor: (0, _colorManipulator.fade)(_styles.colors.darkBlack, 0.07)
  }
};

theme.muiProps = {
  TableHeader: {
    RaisedButton: {
      default: {
        style: {
          borderRadius: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          boxShadow: 'none'
        },
        rippleStyle: {
          borderRadius: '0px'
        },
        labelStyle: {
          paddingLeft: '22px',
          paddingRight: '22px',
          fontSize: theme.sizes.primary,
          color: 'white'
        }
      }
    },
    TextField: {
      default: {
        underlineStyle: {
          bottom: '0px',
          left: '0px'
        },
        underlineFocusStyle: {
          bottom: '0px',
          left: '0px'
        },
        errorStyle: {
          fontSize: '12px',
          color: 'rgb(250, 187, 0)',
          fontWeight: '500',
          top: '0px',
          textAlign: 'right',
          marginRight: '-4px'
        },
        style: {
          paddingLeft: '4px',
          paddingRight: '4px',
          height: '30px',
          width: '30%',
          minWidth: '130px',
          maxWidth: '180px',
          backgroundColor: _styles.colors.grey300,
          fontSize: '15px'
        },
        inputStyle: {
          color: 'rgb(0, 0, 0)',
          marginTop: '0px'
        },
        hintStyle: {
          color: theme.brand.primary,
          textTransform: 'uppercase',
          backgroundColor: 'rgba(255, 255, 255, 0.0)',
          top: '3px',
          left: '4px'
        }
      }
    }
  },
  Header: {
    RaisedButton: {
      default: {}
    }
  },
  CreateProcessDefinition: {
    Dialog: {
      default: {
        actionsContainerStyle: {
          textAlign: 'center'
        }
      }
    }
  },
  DeleteProcessDefinition: {
    Dialog: {
      default: {
        actionsContainerStyle: {
          textAlign: 'center'
        }
      }
    }
  },
  ConfirmItem: {},
  ProcessDefinitionConfirmItem: {},
  ProcessDefinition: {},
  ProcessDefinitionFormItem: {
    CheckBox: {
      default: {
        iconStyle: {
          display: 'flex'
        },
        labelStyle: {
          textAlign: 'left'
        }
      }
    },
    RadioButton: {
      default: {
        iconStyle: {
          display: 'flex'
        },
        labelStyle: {
          textAlign: 'left'
        }
      }
    },
    DropDown: {
      default: {
        style: {
          textAlign: 'left',
          width: '100%'
        },
        labelStyle: {
          padding: '0px',
          paddingLeft: '4px'
        },
        underlineStyle: {
          margin: '0px'
        }
      }
    }
  },
  TableSelector: {
    CheckBox: {
      default: {
        style: {
          textAlign: 'left',
          border: '0px'
        },
        uncheckedIcon: _react2.default.createElement('span', null)
      }
    }
  }
};

theme.qflProps = {
  ProcessDefinition: {
    RaisedButton: {
      default: {
        style: {
          display: 'inline-block'
        }
      }
    },
    Form: {
      default: {
        style: {
          display: 'table',
          margin: '0 auto',
          width: '300px'
        }
      }
    }
  },
  CreateProcessDefinition: {
    RaisedButton: {
      default: {
        style: {
          textAlign: 'center',
          paddingLeft: theme.distances.primary,
          display: 'inline-block'
        }
      }
    },
    Dialog: {
      default: {}
    }
  },
  DeleteProcessDefinition: {
    RaisedButton: {
      default: {
        style: {
          textAlign: 'center',
          paddingLeft: theme.distances.primary,
          display: 'inline-block'
        }
      }
    },
    Dialog: {
      default: {}
    }
  },
  ConfirmItem: {},
  TableHeader: {
    RaisedButton: {
      default: {
        style: {
          fontFamily: 'Open Sans Condensed Light'
        }
      }
    },
    TextField: {
      default: {
        style: {
          fontFamily: 'Open Sans Condensed Light'
        }
      }
    }
  },
  ProcessDefinitionConfirmItem: {
    RaisedButton: {
      default: {
        style: {
          display: 'inline-block'
        }
      }
    }
  },
  ProcessDefinitionFormItem: {
    CheckBox: {
      default: {
        style: {
          display: 'table-row'
        }
      }
    },
    DropDown: {
      default: {
        style: {
          display: 'table-row'
        }
      }
    },
    RadioBox: {
      default: {
        style: {
          display: 'table-row'
        }
      }
    }
  }
};

exports.default = theme;
module.exports = exports['default'];
