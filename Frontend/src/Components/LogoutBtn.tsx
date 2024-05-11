import useAuth from "../Hooks/useAuth";

const LogoutBtn = () => {
    const { loading, logout } = useAuth();

    const logoutHandler = async () => {
        await logout();
    };

    return (
        <div className="cursor-pointer px-1">
            {loading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                <img
                    className="w-11 h-10 hover:bg-gray-500 hover:scale-110 rounded-full"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9UlEQVR4nO2au04CQRSGPwyNWmm0oxA1Kl4Lo7Gh1sfQJzAaG6MxxFqk0Zew8/IiJt4o7DRBofFC1ELXTLIkhCwgMssMzPmSv+Qc5t/ds3PODgiCIAiCIAha6QUmgXlNUrF6aAOWgAvgE/A0S8U8BxaxlD3gJ4SFV0rl2MUytlqw8EptYAlx4MuAASrnCBaQMbD4ktJYwK1BA66xgGKNP1gA7ptUoUZ8lds4Xg2p+tAsw3VyGMeroZiG+CqGGIDDd0AU6AO6gHFgv6LudLwBQUyUvX2cNEAxAFziiAErwBrQH2BCxxuQLov3CCSwDC9EAyIBG62cPx+wBi/kOyAbEPcJmMIRA5JVttvKhGkcKYJJ4C0g/jMwSxsaMAYcAicN6K5KjjwwRxsZMAy81vldo8prarxaYkBK8+JLOsZxA45oEwPiwIvLj4Bi1N/h6SqCRt8E3j8M0PkanMEwXsgGOL8RygYYm3NlKxwB3l1vhg7K4j241g6XWAZW/dmgcwORagy6NBJzeiga9WeBEb+LTFUUxo43IFYnh3E8MYCqJqjev+M/jhYNfh5XtcA4N3WuUJi6wgIyrh+RGQrpXOBfDknpqDFa2DRgwDqWsQN8t2DhKsc2lrIAnIX0SHwAp/7ZYevp9ttWXYelE35MQRAEQRAEAU38Ali4UumShvNJAAAAAElFTkSuQmCC"
                    onClick={logoutHandler}
                />
            )}
        </div>
    );
};

export default LogoutBtn;
