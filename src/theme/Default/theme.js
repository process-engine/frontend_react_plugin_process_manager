import { colors, spacing, zIndex } from 'material-ui/styles';
import { fade } from 'material-ui/utils/colorManipulator';
import React from 'react';
import CleanCheckbox from 'material-ui/svg-icons/action/done';

const DemoTheme = {
  brand: {
    primary: '#000000',
    secondary: '#E0E0E0',
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

const theme = {
  spacing,
  zIndex,
  fontFamily: 'Open Sans Condensed Light',
  palette: {
    primary3Color: colors.lightBlack,
    accent1Color: colors.darkBlack,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    shadowColor: colors.fullBlack
  },

  distances: {
    halfPrimary: DemoTheme.distances.halfPrimary,
    primary: DemoTheme.distances.primary,
    secondary: DemoTheme.distances.secondary,
    tertiary: DemoTheme.distances.tertiary
  },
  brand: {
    primary: DemoTheme.brand.primary,
    secondary: DemoTheme.brand.secondary,
  },
  sizes: {
    primary: DemoTheme.sizes.primary,
    secondary: DemoTheme.sizes.secondary,
    tertiary: DemoTheme.sizes.tertiary,
    minWidth: DemoTheme.sizes.minWidth,
    maxWidth: DemoTheme.sizes.maxWidth
  },

  datePicker: {
    textColor: colors.white,
    calendarTextColor: colors.darkBlack,
    selectTextColor: colors.white
  },

  timePicker: {
    clockCircleColor: fade(colors.darkBlack, 0.07)
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
          backgroundColor: colors.grey300,
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
      default: {

      }
    }
  },
  ProcessManager: {
    default: {
      style: {
        overflowY: 'auto'
      },
      titleStyle: {
        backgroundColor: '#000',
        padding: '0px 0px 0px 2px',
        color: '#fff',
        marginBottom: '2px',
        fontSize: '24px',
        lineHeight: '36px',
        textTransform: 'uppercase'
      },
      bodyStyle: {
        padding: '0px 8px',
        fontSize: '16px'
      }
    }
  },
  ConfirmItem: {

  },
  ProcessDefinitionConfirmItem: {

  },
  ProcessDefinition: {

  },
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
        checkedIcon: <CleanCheckbox
          style={{
            width: '20px',
            height: '20px'
          }}
        />,
        uncheckedIcon: <span/>
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
  ConfirmItem: {

  },
  TableHeader: {
    RaisedButton: {
      default: {
        style: {
          width: 'auto',
          display: 'inline-block',
          verticalAlign: 'top',
          position: 'relative',
          marginLeft: '8px',
          marginTop: '8px'
        }
      }
    },
    TextField: {
      default: {
        style: {
          marginTop: '8px'
        }
      }
    },
    DropDown: {
      default: {
        style: {
          position: 'relative',
          fontSize: 'inherit',
          bottom: '0px',
          width: '200px',
          paddingTop: '0px',
          display: 'inline-block',
          marginLeft: '8px',
          marginRight: '8px',
          marginTop: '8px'
        },
        labelStyle: {
          position: 'absolute',
          fontSize: '18px',
          left: '8px',
          top: '-24px'
        },
        errorStyle: {
          position: 'absolute',
          right: '8px',
          top: '-18px',
          fontSize: '16px',
          color: theme.brand.vorstartRed,
          marginRight: '4px',
          lineHeight: '16px',
        }
      },
    }
  },
  ProcessDefinitionConfirmItem: {
    RaisedButton: {
      default: {
        style: {
          display: 'inline-block'
        }
      }
    },
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
  },
  TodoBasketConfirmItem: {
    RaisedButton: {
      default: {
        style: {
          display: 'inline-block'
        }
      }
    },
  },
  TodoBasketFormItem: {
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

theme.rbtProps = {
  Table: {
    Table: {
      default: {
        containerStyle: {
          fontSize: '20px',
          display: 'block',
          overflow: 'hidden',
          marginLeft: '8px',
          marginRight: '8px'
        },
        tableStyle: {
          border: '0px',
          borderTop: '1px solid #DCDBDC',
          borderRadius: '0px',
          margin: theme.distances.primary + ' 0px 0px 0px'
        },
        headerStyle: {
          fontSize: '24px',
          textTransform: 'uppercase',
          height: '40px'
        },
        bodyStyle: {
          textAlign: 'left'
        }
      }
    }
  }
};

export default theme;
