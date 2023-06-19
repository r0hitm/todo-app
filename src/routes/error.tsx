import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    if (isRouteErrorResponse(error)) {
        // Handle route error response
        return (
            <div id="error-page">
                <h1>Oops! {error.status}</h1>
                <p>{error.statusText}</p>
                {error.data?.message && (
                    <p>
                        <i>{error.data.message}</i>
                    </p>
                )}
            </div>
        );
    } else {
        return (
            <div>Oops, unexpected error that is not a route error occured</div>
        );
    }
}
