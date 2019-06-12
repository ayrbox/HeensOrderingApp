const TEXT_COLOR = '#fff';

const styles = theme => ({
  title: {
    color: TEXT_COLOR,
    paddingBottom: theme.spacing.unit,
  },
  type: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  spacer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    backgroundColor: TEXT_COLOR,
  },
  item: {
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
    justifyContent: 'space-between',
  },
  itemText: {
    color: TEXT_COLOR,
    fontSize: '0.8rem',
  },
  itemTotal: {
    color: TEXT_COLOR,
    fontSize: '0.8rem',
  },
  option: {
    padding: `0 0 0 ${theme.spacing.unit * 2}px`,
    justifyContent: 'space-between',
  },
  optionText: {
    color: TEXT_COLOR,
    fontSize: '0.65rem',
  },
  optionCost: {
    color: TEXT_COLOR,
    fontSize: '0.65rem',
  },
  orderTotal: {
    color: TEXT_COLOR,
    textAlign: 'right',
  },
});

export default styles;
